import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';

@Service()
export class UsersService extends BaseService {
    constructor() {
        super('users');
    }

    /**
     * 根据id获取用户信息   不带邮箱、密码等信息
     * 
     * @param {any} id 
     * @returns 
     * @memberof UsersService
     */
    async getUsersByParams({ id, email }) {
        let sql = 'select id,nickName,motto,headimg,github,juejin,jianshu,zhihu from users where 1=1';
        if (id) {
            sql += ' and id =' + id;
        }
        if (email) {
            sql += ` and email = "${email}"`;
        }
        let users = await this.execute(sql);
        return users[0] || {};
    }

    /**
     * 登录 根据email获取登录信息
     * 
     * @param {any} { email } 
     * @returns 
     * @memberof UsersService
     */
    async getUsersLogin({ email }) {
        let sql = `select * from users where disabled = 1 and  email = "${email}"`;
        let users = await this.execute(sql);
        return users[0] || {};
    }

    /**
     * 根据email、phone查询用户是否存在
     * 
     * @param {any} { email } 
     * @returns 
     * @memberof UsersService
     */
    async getUsersExist({ email, phone }) {
        let sql = `select * from users where phone='${phone}' or email='${email}'`;
        console.log(sql)
        let users = await this.execute(sql);
        return users[0] || {};
    }

    /**
     * 获取所有用户列表
     * 
     * @memberof UsersService
     */
    async findAllUsers({ disabled } = { disabled: null }) {
        let sql = `select * from users where 1=1`;
        if (disabled || disabled == 0) {
            sql += ' and disabled = ' + disabled
        }
        return await this.execute(sql);
    }

}