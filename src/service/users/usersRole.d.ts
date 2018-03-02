import { UsersRole } from '../../entity/usersRole';

export interface UsersRoleInterface {
    /**
     * 获取所有分类列表
     * 
     * @param {number} disabled 
     * @memberof UsersRoleInterface
     */
    findAllUsersRole(disabled: number);
    /**
     * 添加或保存类型
     * 
     * @param {UsersRole} usersRole 
     * @memberof UsersRoleInterface
     */
    saveOrUpdateUsersRole(usersRole: UsersRole);

    /**
     * 逻辑删除
     * 
     * @param {(number | UsersRole)} any 
     * @memberof ArticleInterface
     */
    disabledUsersRole(any: number | UsersRole);
    /**
     * 恢复逻辑删除
     * 
     * @param {(number | UsersRole)}
     * @memberof ArticleInterface
     */
    publishUsersRole(id: number | UsersRole);
    /**
     * 物理删除
     * 
     * @param {(number | UsersRole)} any 
     * @memberof ArticleInterface
     */
    deletedUsersRole(any: number | UsersRole);
}