import { Controller, Get, Post, Crypto, isNotEmpty } from '../../../@common';
import { isNotInteger, isEmpty, isFalse, Format, isArray, isEmail, isPhone } from '../../../@common/utils';
// import { randomBytes } from 'crypto';
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
    async login(req, res) {
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


    @Get('/getOneById')
    async getOneById({ query }, res) {
        let { id } = query;
        if (isNotInteger(id)) {
            return res.sendError('入参格式不正确');
        }
        let users: Users = await usersService.getUsersById(id);
        if(users.password){
            users.password = Crypto.aesDecryptPipe(users.password);
        }
        return res.sendSuccess(users);
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
        var { id = 0, email, phone = '', userName = '', password, nickName, roleId } = body;
        if (isEmpty(email)) {
            return res.sendError('邮箱不能为空');
        }
        if (!isEmail(email)) {
            return res.sendError('邮箱格式不正确');
        }
        if (isEmpty(nickName)) {
            return res.sendError('昵称不能为空');
        }
        if (!/^[a-zA-Z\.\s\u4e00-\u9fa5]{2,20}$/.test(nickName)) {
            return res.sendError('用户昵称为长度 2 到 8 个中文字符或者 2 到 20 个英文字符');
        }
        if (isEmpty(password)) {
            return res.sendError('密码不能为空');
        }
        if (!/^[\w\.\s\!\@\#\$\%\^\.\,\/\?\>\<\(\)\-\_\=\+\`\~]{6,26}$/.test(password)) {
            return res.sendError('密码必须为长度6 到 26 个字符');
        }
        if (isNotInteger(roleId)) {
            return res.sendError('请选择正确的用户组');
        }
        if (isNotEmpty(userName) && !/^([\u4e00-\u9fa5][a-zA-Z\.\s]{2,20})$/.test(userName)) {
            return res.sendError('用户名为长度 2 到 8 个中文字符或者 2 到 20 个英文字符');
        }
        if (isNotEmpty(phone) && !/^1\d{10}$/.test(phone)) {
            return res.sendError('请填写11位长度的手机号码');
        }
        let usersList: Array<Users> = await usersService.getUsersExist({ phone, email });

        let operUsers = <Users>{};
        if (id) {
            operUsers = await usersService.getUsersById(id);
        }
        let checkUser = usersList.some((item: Users) => {
            if (email && item.email == email) {
                if (operUsers.email && operUsers.email != email) {
                    return res.sendError('邮箱已存在');
                }
            } else if (phone && item.phone == phone && phone != operUsers.phone) {
                if (operUsers.phone && operUsers.phone != phone) {
                    return res.sendError('联系方式已存在');
                }
            } else {
                if (!operUsers.id) {
                    return res.sendError('未知异常');
                }
            }
            return true;
        });
        if (operUsers) {
            let users = <Users>{};
            var usersRole = <UsersRole>{};
            users.nickName = nickName || email;
            users.email = email;
            users.phone = phone;
            users.userName = userName;
            usersRole.id = roleId;
            users.usersRole = usersRole;
            users.createDate = Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
            users.password = Crypto.aesEncryptPipe(password);
            // users.identity = randomBytes(15).toString('hex');
            users.identity = (new Buffer(email)).toString('base64');
            if (id) {
                users.id = id;
            }
            res.sendSuccess(await usersService.saveOrUpdateUser(users));
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