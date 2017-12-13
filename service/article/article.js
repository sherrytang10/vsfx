import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';
import { isInterger } from '../../lib/@common/validate';
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
    async findAllArticle({ articleTypeId = 0, type = 0, nickName = '', desabled = null, pageSize = 20, currPage = 1 }) {
        // let sql = `select a.id, a.title,case a.type when '1' then '文章' else '短记' end type,a.articleTypeId,at.name articleTypeName,au.nickName,a.docreader,
        //     a.labelIds,a.picture,a.praise,a.visitors, date_format(a.publishTime, "%Y-%m-%d %H:%I:%S") publishTime,  case a.disabled when '1' then '发布' else '下线' end disabled 
        //     from article a, article_type at, users au 
        //     where at.id = a.articleTypeId and au.id = a.authorUserId`;
        // if (isInterger(disabled)) {

        //     sql += ' and a.disabled = ' + disabled;
        // }
        // if (isInterger(typeId)) {
        //     sql += ' and a.articleTypeId = ' + typeId;
        // }
        // if (isInterger(userId)) {
        //     sql += ' and a.authorUserId = ' + userId;
        // }
        // return await this.execute(sql);
        let [articleList, [{ total }]] = await this.execute(`call getArticleList(${articleTypeId}, ${type}, ${desabled},${nickName || null},${currPage}, ${pageSize})`);
        return { articleList, total }
    }

    /**
     * 根据id获取一篇文章
     * 
     * @param {any} id 
     * @returns 
     * @memberof ArticleService
     */
    async getArticleInfoById({ id }) {
        let sql = `select a.id, a.title,a.type,a.articleTypeId,at.name articleTypeName,au.nickName,a.docreader,
        a.labelIds,a.picture,a.praise,a.visitors, cast(a.content as char) content, date_format(a.publishTime, "%Y-%m-%d %H:%I:%S") publishTime
        from article a, article_type at, users au 
        where at.id = a.articleTypeId and au.id = a.authorUserId`;
        if (isInterger(id)) {
            sql += ' and a.id = ' + id;
        }
        let result = await this.execute(sql);
        return result[0];
    }
}