
import { Service } from '../../@common';
import { BaseService } from '../BaseService';
import { ArticleInterface, findAllArticleD } from './article.d';
import { Article } from '../../entity/article';
@Service()
export class ArticleService extends BaseService implements ArticleInterface {
    execute;
    getRepository;
    getConnection;
    /**
     * 获取所有文章列表
     * 
     * @param {Article} article 
     * @memberof ArticleInterface
     */
    async findAllArticle({ articleTypeId = 0, type = 0, nickName = '', desabled = null, pageSize = 20, currPage = 1 }: findAllArticleD) {
        // let [articleList, [{ total }]] = await this.execute(`call getArticleList(${articleTypeId}, ${type}, ${desabled},${nickName || null},${currPage}, ${pageSize})`);
        // return { articleList, total }
        let query = this.getRepository(Article).createQueryBuilder("article");
        let articleList = await query.skip(currPage - 1).take(pageSize).getMany();

        let total = await this.getRepository(Article).count();
        return { articleList, total };
    }

    /**
     * 获取文章详情
     * 
     * @param {number} id 
     * @memberof ArticleInterface
     */
    async getArticleInfoById(id: number): Promise<Article> {
        let sql = `select a.id, a.title,a.type,a.articleTypeId,at.name articleTypeName,au.nickName,a.docreader,
        a.labelIds,a.picture,a.praise,a.visitors, cast(a.content as char) content, date_format(a.publishTime, "%Y-%m-%d %H:%I:%S") publishTime
        from article a, article_type at, users au 
        where at.id = a.articleTypeId and au.id = a.authorUserId`;
        sql += ' and a.id = ' + id;
        let result = await this.execute(sql);
        return result[0];
    }

    /**
     * 添加或保存文章
     * 
     * @param {Article} article 
     * @memberof ArticleInterface
     */
    async saveOrUpdateArticle(article: Article) {
        // let exe = await this.getRepository(Article).save(article);
        // return exe ? '操作成功' : '操作失败';
        return await super.saveOrUpdateAny(Article, article);
    }

    /**
     * 逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async disabledArticle(id: number) {
        // let exe = await this.getRepository(Article).updateById(id, { disabled: 0 });
        // return exe ? '禁用成功' : '禁用失败';
        return await super.disabledAny(Article, id);
    }
    /**
     * 恢复逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async publishArticle(id: number) {
        // let exe = await this.getRepository(Article).updateById(id, { disabled: 1 });
        // return exe ? '发布成功' : '发布失败';
        return await super.publishAny(Article, id);
    }

    /**
     * 物理删除
     * 
     * @param {(number | Article)} any 
     * @memberof ArticleInterface
     */
    async deletedArticle(id: number) {
        // let exe = await this.getRepository(Article).removeById(id);
        // return exe ? '删除成功' : '删除失败';
        return await super.deletedAny(Article, id);
    }
    async deletedArticlesByUsersId(usersId: number) {
        await this.getConnection().createQueryBuilder().delete().from(Article).where("users.id = :usersId", { usersId }).execute();
        return '操作成功';
    }

}