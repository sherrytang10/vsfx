
import { Service, isInterger } from '../../@common';
import { BaseService } from '../BaseService';
import { ArticleTypeInterface } from './articleType.d';
import { ArticleType } from 'entity/articleType';
@Service()
export class ArticleTypeService extends BaseService implements ArticleTypeInterface {
    execute;
    getRepository;
    /**
     * 根据用户查询文章分类和分类总数
     * 
     * @param {number} userId 
     * @memberof ArticleTypeInterface
     */
    async findAllGroupType(userId: number) {
        let query = `SELECT count(a.articleTypeId) as num, at.id as id, at.name classify 
        FROM article a LEFT JOIN article_type at ON at.id=a.articleTypeId 
        LEFT JOIN users au ON au.id=a.authorUserId 
        WHERE a.disabled=1`
        if (userId) {
            query += ` and au.id=` + userId;
        }
        query += ' GROUP BY a.articleTypeId';
        return this.execute(query);
    }

    /**
     * 获取所有分类列表
     * 
     * @param {number} disabled 
     * @memberof ArticleTypeInterface
     */
    async findAll(disabled: number): Promise<Array<ArticleType>> {
        let query = 'select id, name from article_type where 1=1';
        if (isInterger(disabled)) {
            query += ` and disabled=${disabled}`;
        }
        return this.execute(query);
    }

    /**
     * 添加或保存文章
     * 
     * @param {Article} article 
     * @memberof ArticleInterface
     */
    async saveOrUpdateArticleType(articleType: ArticleType): Promise<string> {
        // let exe = await this.getRepository(ArticleType).save(articleType);
        // return exe ? '操作成功' : '操作失败';
        return await super.saveOrUpdateAny(ArticleType, articleType)
    }

    /**
     * 逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async disabledArticleType(id: number) {
        // let exe = await this.getRepository(ArticleType).updateById(id, { disabled: 0 });
        // return exe ? '禁用成功' : '禁用失败';
        return await super.disabledAny(ArticleType, id);
    }
    /**
     * 恢复逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async publishArticleType(id: number) {
        // let exe = await this.getRepository(ArticleType).updateById(id, { disabled: 1 });
        // return exe ? '发布成功' : '发布失败';
        return await super.publishAny(ArticleType, id);
    }

    /**
     * 物理删除
     * 
     * @param {(number | Article)} any 
     * @memberof ArticleInterface
     */
    async deletedArticleType(id: number) {
        // let exe = await this.getRepository(ArticleType).removeById(id);
        // return exe ? '删除成功' : '删除失败';
        return await super.deletedAny(ArticleType, id);
    }

}