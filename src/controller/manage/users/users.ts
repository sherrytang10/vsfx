import { Controller, Get, Post, /*Validation, */Crypto, isNotInteger, isEmpty, isFalse, Format } from '../../../@common';
import { UsersService } from '../../../service/users/users';
import { ArticleService } from '../../../service/article/article';
import { Users } from '../../../entity/users';
import { UsersRole } from '../../../entity/usersRole';

const usersService = new UsersService();
const articleService = new ArticleService();
@Controller('/users')
export class UsersController {
    /**
     * 登录
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof usersController
     */
    @Post('/login')
    async findOneById(req, res) {
        var { email, password: upass } = req.body;
        if (isEmpty(email)) {
            return res.sendError('邮箱地址不能为空')
        }
        var users = await usersService.getUsersLogin({ email });
        if (users.id) {
            let { password } = users;
            password = Crypto.aesDecryptPipe(password);
            if (password != upass) {
                return res.sendError('用户名或密码不正确');
            }
            req.session.users = users;
        } else {
            return res.sendError('用户名不存在');
        }
        res.sendSuccess({ nickName: users.nickName });
    }

    /**
     * 获取所有用户
     * 
     * @returns 
     * @memberof usersController
     */
    @Get('/findAll')
    async findAllUsers(req, res) {
        res.sendSuccess(await usersService.findAllUsers());
    }

    /**
     * 保存用户
     * 
     * @param {any} { modelData } 
     * @returns 
     * @memberof usersController
     */
    @Post('/save')
    // @Validation(UsersCreateDto)
    async saveUsers({ body }, res) {
        var { email, phone, password, nickName } = body;
        if (isEmpty(email)) {
            return res.sendError('邮箱不能为空');
        }
        if (isEmpty(password)) {
            return res.sendError('密码不能为空');
        }
        var users: Users = await usersService.getUsersExist({ phone, email });
        if (!users.id) {
            var usersRole = <UsersRole>{};
            users.nickName = nickName || email;
            users.email = email;
            users.phone = phone;
            usersRole.id = 1;
            users.usersRole = usersRole;
            users.createDate = Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
            users.password = Crypto.aesEncryptPipe(password);
            res.sendSuccess(await usersService.saveOrUpdateUser(users));
        }
        else if (users.email == email) {
            res.sendError('邮箱已存在');
        } else if (users.phone == phone) {
            res.sendError('联系方式已存在');
        } else {
            res.sendError('未知异常');
        }
    }

    /**
     * 修改用户
     * 
     * @param {any} { modelData } 
     * @returns 
     * @memberof usersController
     */
    @Post('/update')
    // @Validation(UsersUpdateDto)
    async updateUsers({ body }, res) {
        var users = new Users();
        Object.assign(users, body);
        res.sendSuccess(await usersService.saveOrUpdateUser(users));
    }

    /**
     * 禁用某用户
     * 
     * @memberof usersController
     */
    @Get('/disabled/:id')
    async disabledUserById({ params: { id } }, res) {
        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误')
        }
        res.sendSuccess(await usersService.disabledUsers(id));
    }

    /**
     * 启用某用户
     * 
     * @memberof usersController
     */
    @Get('/publish/:id')
    async publishUserById({ params: { id } }, res) {
        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误')
        }
        res.sendSuccess(await usersService.publishUsers(id));
    }

    /**
     * 删除某用户
     * 
     * @param {any} { params: { id } } 
     * @param {any} res 
     * @returns 
     * @memberof usersController
     */
    @Get('/delete/:id')
    async deleteUserById({ params: { id }, session }, res) {
        try {
            if (session.users.UsersRole.id != 1) {
                return res.sendError('没有权限', 997);
            }
        } catch (e) {
            return res.sendError('没有权限', 997);
        }
        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误')
        }
        await articleService.deletedArticlesByUsersId(id);
        res.sendSuccess(await usersService.deletedUsers(id));
    }
}