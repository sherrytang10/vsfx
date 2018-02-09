import { Service } from '../../@common';
import { BaseService } from '../BaseService';
import { UsersInterface, UsersOption } from './users.d';
import { Users } from '../../entity/users';
@Service()
export class UsersService extends BaseService implements UsersInterface {
    execute: any;
    getRepository: Function;
    /**
     * 根据id获取用户信息   不带邮箱、密码等信息
     * 
     * @param {any} id 
     * @returns 
     * @memberof UsersService
     */
    async getUsersById(id: number): Promise<Users> {
        let users: Users = await this.getRepository(Users).findOneById(id);
        return users || {};
    }

    /**
     * 登录 根据email获取登录信息
     * 
     * @param {any} { email } 
     * @returns 
     * @memberof UsersService
     */
    async getUsersLogin({ email }: UsersOption): Promise<Users> {
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
    async getUsersExist({ email, phone }: UsersOption): Promise<Users> {
        let sql = `select * from users where phone='${phone}' or email='${email}'`;
        let users = await this.execute(sql);
        return users[0] || {};
    }

    /**
     * 获取所有用户列表
     * 
     * @memberof UsersService
     */
    async findAllUsers(disabled?: number): Promise<Array<Users>> {
        let sql = `select * from users where 1=1`;
        if (disabled || disabled == 0) {
            sql += ' and disabled = ' + disabled
        }
        return await this.execute(sql);
    }

    /**
     * 添加或修改用户
     * 
     * @param {Users} users 
     * @returns {Promise<string>} 
     * @memberof UsersService
     */
    async saveOrUpdateUser(users: Users): Promise<string> {
        // let exe = await this.getRepository(Users).save(users);
        // return exe ? '操作成功' : '操作失败';
        return await super.saveOrUpdateAny(Users, users);
    }

    /**
     * 逻辑删除
     * 
     * @param {(number | Users)}
     * @memberof UsersInterface
     */
    async disabledUsers(id: number) {
        // let exe = await this.getRepository(Users).updateById(id, { disabled: 0 });
        // return exe ? '禁用成功' : '禁用失败';
        return await super.disabledAny(Users, id);
    }
    /**
     * 恢复逻辑删除
     * 
     * @param {(number | Users)}
     * @memberof UsersInterface
     */
    async publishUsers(id: number) {
        // let exe = await this.getRepository(Users).updateById(id, { disabled: 1 });
        // return exe ? '发布成功' : '发布失败';
        return await super.publishAny(Users, id);
    }

    /**
     * 物理删除
     * 
     * @param {(number | Users)} any 
     * @memberof UsersInterface
     */
    async deletedUsers(id: number) {
        // let exe = await this.getRepository(Users).removeById(id);
        // return exe ? '删除成功' : '删除失败';
        return await super.deletedAny(Users, id);
    }
}