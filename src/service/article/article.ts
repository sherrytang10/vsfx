
import { Service } from '../../@common';
import { BaseService } from '../BaseService';
import { ArticleInterface, findAllArticleD } from './article.d';
import { Article } from '../../entity/article';
import { ArticleType } from 'entity/articleType';
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
        let query = this.getRepository(Article).createQueryBuilder("article")
            .leftJoinAndSelect('article.users', 'users')
            .leftJoinAndSelect('article.articleType', 'articleType')
            .select([
                'date_format(article.publishDate, "%Y-%m-%d %H:%I:%S") publishDate',
                'article.title title',
                // 'article.labelIds labelIds',
                // 'date_format(a.createDate, "%Y-%m-%d %H:%I:%S") createDate',
                'article.docreader docreader',
                'article.id id',
                'article.visitors visitors',
                // 'cast(article.content as char) content',
                'article.praise praise',
                'article.picture picture',
                'articleType.id articleTypeId',
                'articleType.name articleTypeName',
                'article.disabled disabled',
                'article.type type',
                'users.id usersId',
                'users.nickName nickName'
            ]);
        query = query.where('1=1');
        if (type) {
            query = query.andWhere('type=:type', { type });
        }
        let articleList: Array<Article> = await query.skip(currPage - 1).take(pageSize)./*printSql().*/getRawMany();

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
        let query = this.getRepository(Article).createQueryBuilder("article")
            .leftJoinAndSelect('article.users', 'users')
            .leftJoinAndSelect('article.articleType', 'articleType')
            .select([
                'article.id id',
                'article.title title',
                'article.type type',
                'article.docreader docreader',
                'article.picture picture',
                'article.visitors visitors',
                'article.praise praise',
                'cast(article.content as char) content',
                'date_format(article.publishDate, "%Y-%m-%d %H:%I:%S") publishDate',
                'article.disabled disabled',
                'articleType.id articleTypeId',
                'articleType.name articleTypeName',
                'users.id usersId',
                'users.nickName nickName'
            ]);
        query = query.where('article.id=:id', { id });
        let article: Article = await query.getRawOne();

        return article || {};
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