
import { Service, isInteger } from '../../@common';
import { BaseService } from '../BaseService';
import { UsersRoleInterface } from './usersRole.d';
import { UsersRole } from '../../entity/usersRole';
@Service()
export class UsersRoleService extends BaseService implements UsersRoleInterface {
    getRepository;
    /**
     * 获取所有分类列表
     * 
     * @param {number} disabled 
     * @memberof UsersRoleInterface
     */
    async findAllUsersRole(disabled: number): Promise<Array<UsersRole>> {
        let usersRole: Array<UsersRole> = this.getRepository(UsersRole).find();
        return usersRole;
    }

    /**
     * 添加或保存文章
     * 
     * @param {Article} article 
     * @memberof ArticleInterface
     */
    async saveOrUpdateUsersRole(usersRole: UsersRole): Promise<string> {
        // let exe = await this.getRepository(UsersRole).save(usersRole);
        // return exe ? '操作成功' : '操作失败';
        return await super.saveOrUpdateAny(UsersRole, usersRole)
    }

    /**
     * 逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async disabledUsersRole(id: number) {
        // let exe = await this.getRepository(UsersRole).updateById(id, { disabled: 0 });
        // return exe ? '禁用成功' : '禁用失败';
        return await super.disabledAny(UsersRole, id);
    }
    /**
     * 恢复逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async publishUsersRole(id: number) {
        // let exe = await this.getRepository(UsersRole).updateById(id, { disabled: 1 });
        // return exe ? '发布成功' : '发布失败';
        return await super.publishAny(UsersRole, id);
    }

    /**
     * 物理删除
     * 
     * @param {(number | Article)} any 
     * @memberof ArticleInterface
     */
    async deletedUsersRole(id: number) {
        // let exe = await this.getRepository(UsersRole).removeById(id);
        // return exe ? '删除成功' : '删除失败';
        return await super.deletedAny(UsersRole, id);
    }

}