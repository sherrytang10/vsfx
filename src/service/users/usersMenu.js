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

    /**
     * 获取所有的菜单
     * 
     * @param {any} operaUser 
     * @returns 
     * @memberof UserMenuService
     */
    async getUsersMenuList({ parentId = null, menuName = null, disabled = null, isMenu = null }) {
        let query = $sql.userMenuAllList;
        if (isInteger(disabled)) {
            query += ' and disabled = ' + disabled;
        }
        if (isInteger(isMenu)) {
            query += ' and isMenu = ' + isMenu;
        }
        if (isInteger(parentId)) {
            query += ' and parentId = ' + parentId;
        }
        if (menuName) {
            query += ` and menuName like "%${menuName}%"`;
        }
        query += ' order by parentId, sort asc';
        return this.execute(query);
    }

    /**
     * 菜单添加
     * @param {*} params 
     */
    async saveUsersMenu(param) {
        // let query = `INSERT INTO users_menu(parentId, menuKey, menuName, menuUri, isMenu, descriptor, operaUser, createUser, operaType, createDate) VALUES( ${ param.join(',') }, 'save', now())`;
        // return this.execute(`call insertUsersMenu(${query})`);
        let [parentId, menuKey, menuName, menuUri, isMenu, descriptor = '', operaUser, createUser] = param;
        let exe = await this.execute(`call insertUsersMenu(${parentId},"${menuKey}","${menuName}","${menuUri}",${isMenu}, "${descriptor}","${operaUser}","${createUser}")`)
        return exe ? '添加成功' : '添加失败';
    }

    /**
     * 菜单排序
     * @param {any} arr 
     * @memberof UsersMenuService
     */
    async saveSortUsersMenu(arr, __loginUM) {
        let query = `insert into users_menu(id, parentId, sort) values(${arr.join('),(')}) on duplicate key update parentId=VALUES(parentId),sort=VALUES(sort),operaUser='${__loginUM}',operaType='sort';`
        console.log(query)
        let exe = await this.execute(query);
        return exe ? '操作成功' : '操作失败';
    }
}
// userMenuAllList: `select id,parentId,menuKey,menuName,menuUri,menuKey,descriptor,isMenu from users_menu where 1=1`,
// anySave: `INSERT INTO users_menu(parentId, menuKey,menuName,menuUri,isMenu,descriptor,operaUser,operaType,createUser,createDate,sort) VALUES(?,?,?,?,?,?,?,'save',?,now(),last_insert_id()+1);`,
// anyUpdate: `UPDATE users_menu SET parentId = ?, menuKey=?,menuName = ?,menuUri = ?,isMenu=?,descriptor = ?,operaUser = ?,operaType='update' WHERE id = ?;`,
// anyDelete: `DELETE from users_menu WHERE id = ?;`,
// anyPublic: `update users_menu set disabled = 1,operaUser=?,operaType='publish',updateDate=now() where id=?`,
// anyDisabled: `update users_menu set disabled = 0,operaUser=?,operaType='disabled',updateDate=now() where id=?`,
// anyDelete: `delete from users_menu where id = ?`