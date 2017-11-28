import { Controller, Get, Post, Validation, Crypto } from '../../../lib/@common';
import { isNotInterger, isEmpty, isFalse } from '../../../lib/@common/validate';
import { UsersService } from '../../../service/users/users';
import { UsersCreateDto } from './dto/users.create.dto';

@Controller('/users')
export class usersController {
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
        let { email, password: upass } = req.body;
        if (isEmpty(email)) {
            return res.sendError('邮箱地址不能为空')
        }
        let users = await UsersService.getUsersLogin({ email });
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
        res.sendSuccess(await UsersService.findAllUsers());
    }

    /**
     * 保存用户
     * 
     * @param {any} { modelData } 
     * @returns 
     * @memberof usersController
     */
    @Post('/save')
    @Validation(UsersCreateDto)
    async saveUsers({ modelData }, res) {
        let { email, phone } = modelData;
        let users = await UsersService.getUsersExist({ phone, email });
        if (!users.id) {
            modelData.password = Crypto.aesEncryptPipe(modelData.password);
            res.sendSuccess(await UsersService.saveAny(modelData));
        }
        // else if (users.disabled == 0) {
        //     res.sendSuccess(await UsersService.publishAny(users.id));
        // }
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
    @Validation(UsersCreateDto)
    async updateUsers({ modelData }, res) {
        res.sendSuccess(await UsersService.updateAny(modelData));
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
        if (isNotInterger(+id)) {
            return res.sendError('入参类型错误')
        }
        res.sendSuccess(await UsersService.disabledAny(id));
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
        if (isNotInterger(+id)) {
            return res.sendError('入参类型错误')
        }
        res.sendSuccess(await UsersService.publishAny(id));
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
    async deleteUserById({ params: { id } }, res) {
        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        if (isNotInterger(+id)) {
            return res.sendError('入参类型错误')
        }
        res.sendSuccess(await UsersService.deleteAny(id));
    }
}