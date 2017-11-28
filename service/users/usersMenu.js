import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';

@Service()
export class UsersMenuService extends BaseService {
    constructor() {
        super('users_menu');
    }

    /**
     * 获取菜单
     * 
     * @param {any} {roleId} 
     * @memberof UsersMenuService
     */
    getMenuListByParam({ roleId }) {
        let sql = 'select * from users_menu where 1= 1';
        if (roleId) {
            sql += ' and roleId = ' + roleId;
        }
        return this.execute(sql);
    }
}