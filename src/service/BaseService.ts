
import { Service } from '../@common';
import { BaseServiceInterface } from './BaseService.d';
@Service()
export class BaseService implements BaseServiceInterface {
    getRepository;
    /**
     * 添加或保存
     * 
     * @param {Article} article 
     * @memberof ArticleInterface
     */
    async saveOrUpdateAny(Model: any, article: any) {
        let exe = await this.getRepository(Model).save(article);
        return exe ? '操作成功' : '操作失败';
    }

    /**
     * 逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async disabledAny(Model: any, id: number) {
        await this.getRepository(Model).updateById(id, { disabled: 0 });
        return '操作成功';
    }
    /**
     * 恢复逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async publishAny(Model: any, id: number) {
        await this.getRepository(Model).updateById(id, { disabled: 1 });
        return '操作成功';
    }

    /**
     * 物理删除
     * 
     * @param {(number | Article)} any 
     * @memberof ArticleInterface
     */
    async deletedAny(Model: any, id: number) {
        await this.getRepository(Model).removeById(id);
        return '操作成功';
    }

}