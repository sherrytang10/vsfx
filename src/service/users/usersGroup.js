import { Service, isInteger } from '../../@common';
import { BaseService } from '../BaseService';
import { UsersInterface, UsersOption } from './users.d';
import { Users } from '../../entity/users';

@Service()
export class UsersGroupService extends BaseService {
    getRepository;
    /**
     * 获取用户组列表-查询条件
     * 
     * @param {any} { disabled = null } 
     * @returns 
     * @memberof UsersGroupService
     */
    async getUserGroupList({ disabled = null, id = null, groupName = null }) {
        let query = $sql.userGroupList;

        if (isInteger(disabled)) {
            query += ' and disabled = ' + disabled;
        }
        if (id) {
            query += ' and id = ' + id;
        }
        if (groupName) {
            query += ' and groupName like "%' + groupName + '%"';
        }
        return await this.execute(query);
    }

    /**
     * 根据id获取用户组信息
     * 
     * @param {any} id 
     * @returns 
     * @memberof UsersGroupService
     */
    async getUserGroupById(id) {
        let [groupInfo] = await this.getUserGroupList({ id });
        return groupInfo;
    }

    /**
     * 根据组名查询
     * 
     * @param {any} groupName 
     * @returns 
     * @memberof UsersGroupService
     */
    async getUserGroupByGroupName(groupName) {
        let query = $sql.userGroupList;
        if (groupName) {
            query += ` and groupName = "${groupName}"`;
        }
        let [groupInfo] = await this.execute(query);
        return groupInfo;
    }
    async updateUsersGroupMenu(menuIds, operaUser, id) {
        let exe = await this.execute($sql.usersGroupUpdateMenu, [menuIds, operaUser, id]);
        return exe ? '操作成功' : '操作失败';
    }
    async updateUsersGroupInterface(interfaceIds, operaUser, id) {
        let exe = await this.execute($sql.usersGroupUpdateInterface, [interfaceIds, operaUser, id]);
        return exe ? '操作成功' : '操作失败';
    }
}