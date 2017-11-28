import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';
@Service()
export class ArticleService extends BaseService {
    constructor() {
        super('article');
    }

    /**
     * 获取文章列表
     * 
     * @param {any} { typeId, id, userId } 
     * @returns 
     * @memberof ArticleService
     */
    async findAllArticle({ typeId, id, userId }) {
        let sql = `select a.id, a.title,a.articleTypeId,at.name articleTypeName,au.nickName,a.docreader,
            a.labelIds,a.picture,a.praise,a.visitors,date_format(a.publishTime, "%Y-%m-%d %H:%I:%S") publishTime from article a, article_type at, users au 
            where a.disabled = 1 and at.id = a.articleTypeId and au.id = a.authorUserId`;
        if (typeId) {
            sql += ' and a.articleTypeId = ' + typeId;
        }
        if (userId) {
            sql += ' and a.authorUserId = ' + userId;
        }
        if (id) {
            sql += ' and a.id = ' + id;
        }
        return await this.execute(sql);
    }

    /**
     * 根据id获取一篇文章
     * 
     * @param {any} id 
     * @returns 
     * @memberof ArticleService
     */
    async getArticleInfoById({ id }) {
        let results = await this.findAllArticle({ id });
        return results[0] || {};
    }
}