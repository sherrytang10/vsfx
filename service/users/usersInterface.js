import { Service } from '../../lib/@common/decorator';
import { BaseService } from '../BaseService';
import { isInteger } from '../../lib/utils/validate';
import $sql from './usersInterfaceMapping';
@Service()
export class UsersInterfaceService extends BaseService {
    constructor() {
        super($sql);
    }

    /**
     * 获取所有接口列表
     * 
     * @param {any} { interfaceName = null, disabled = null } 
     * @returns 
     * @memberof UsersInterfaceService
     */
    async getUsersInterfaceList({ interfaceName = null, disabled = null, menuId = null } = { interfaceName: null, disabled: null, menuId: null }) {
        let queryGroupByMenuName = `select ui.id,ui.interfaceType,ui.interfaceName, ui.interfaceName, ui.interfaceUri, ui.descriptor,ui.menuIds, concat(group_concat(um.menuName),",") menuName from users_interface ui, users_menu um where find_in_set(um.id, ui.menuIds)`,
            queryNotMenusIds = `select ui.id,ui.interfaceType,ui.interfaceName, ui.interfaceName, ui.interfaceUri, ui.descriptor,ui.menuIds ,(case when ui.menuIds =0 then '无' end) menuName from users_interface ui where (ui.menuIds is null or ui.menuIds = 0)`;
        if (isInteger(disabled)) {
            let disabledSql = ` and ui.disabled = ${disabled}`;
            queryGroupByMenuName += disabledSql;
            queryNotMenusIds += disabledSql;
        }
        if (interfaceName) {
            let interfaceNameSql = ` and ui.interfaceName like "%${interfaceName}%"`;
            queryGroupByMenuName += interfaceNameSql;
            queryNotMenusIds += interfaceNameSql;
        }
        if (menuId) {
            let interfaceNameSql = ` and find_in_set(${menuId}, ui.menuIds) `;
            queryGroupByMenuName += interfaceNameSql;
            queryNotMenusIds += interfaceNameSql;
        }
        queryGroupByMenuName += ' GROUP BY ui.id ';

        return await this.execute(`${queryGroupByMenuName} union all ${queryNotMenusIds}`);
    }

    async getUsersInterfaceTypeList() {
        return await this.execute($sql.interfaceTypeList)
    }
}