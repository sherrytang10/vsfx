import { Controller, Get, Post, isNotInterger, isEmpty, isFalse, Format } from '../../../@common';
import { ArticleService } from '../../../service/article/article';
import { Article } from '../../../entity/article';
import { Users } from '../../../entity/users';

/**
 * 文章controller
 * 
 * @export
 * @class ArticleController
 */
const articleService = new ArticleService();
@Controller('/article')
export class ArticleController {
    /**
     * 获取文章列表
     * 
     * @param {any} { query } 
     * @param {any} res 
     * @memberof ArticleController
     */
    @Post('/findAll')
    async findAllArticle({ body }, res) {
        let { articleTypeId, type, desabled, nickName, pageSize = 20, currPage = 1 } = body;
        if (articleTypeId && isNotInterger(articleTypeId)) {
            return res.sendError('分类id类型错误');
        }
        if (type && isNotInterger(type)) {
            return res.sendError('type类型错误');
        }
        if (articleTypeId && isNotInterger(desabled)) {
            return res.sendError('desabled类型错误');
        }
        if (isNotInterger(pageSize) && isNotInterger(currPage)) {
            return res.sendError('分页入参类型错误');
        }
        // res.sendSuccess(await ArticleService.getAnyAll('article', { column: ['id'], where: { disabled: 1, id: 2 } }))
        res.sendSuccess(await articleService.findAllArticle({ articleTypeId, nickName, type, desabled, pageSize, currPage }));
    }

    /**
     * 根据id获取一篇文章
     * 
     * @param {any} { params } 
     * @param {any} res 
     * @memberof ArticleController
     */
    @Get('/info/:id')
    async getArticleInfoById({ params: { id } }, res) {
        if (isNotInterger(+id)) {
            res.sendError('入参类型错误')
        } else {
            res.sendSuccess(await articleService.getArticleInfoById(id))
        }
    }

    @Post('/saveOrUpdate')
    // @Validation(ArticleCreateDto)
    async saveArticleInfo({ body, session }, res) {
        var article: Article = body;

        if (isEmpty(article.title) || (article.title.length > 50)) {
            return res.sendError('标题长度必须为1-50个字符');
        }
        if (isEmpty(article.content)) {
            return res.sendError('内容不能为空');
        }
        var users = new Users();
        users.id = session.users.id;
        article.users = users;
        if (article.type == 1) {
            if (isEmpty(article.picture)) {
                return res.sendError('题图不能为空');
            }
        }
        let nowTime = Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
        article.publishDate = nowTime;
        if (!article.publishDate) {
            article.publishDate = nowTime;
        }
        if (!article.docreader || !article.docreader.replace(/\s/g, '')) {
            article.docreader = article.content.substr(0, 200);
        }
        console.log(article)
        res.sendSuccess(await articleService.saveOrUpdateArticle(article));
    }

    @Get('/pulish')
    async pulishArticle({ query }, res) {
        let { id } = query;
        if (isNotInterger(id)) {
            return res.sendError('入参类型错误');
        }
        if (isFalse(id)) {
            return res.sendError('id不能为空');
        }
        res.sendSuccess(await articleService.publishArticle(id));
    }
    @Get('/disabled')
    async disabledArticle({ query }, res) {
        let { id } = query;
        if (isNotInterger(id)) {
            return res.sendError('入参类型错误');
        }
        if (isFalse(id)) {
            return res.sendError('id不能为空');
        }
        res.sendSuccess(await articleService.disabledArticle(id));
    }
    @Get('/delete')
    async deleteArticle({ query }, res) {
        let { id } = query;
        if (isNotInterger(id)) {
            return res.sendError('入参类型错误');
        }
        if (isFalse(id)) {
            return res.sendError('id不能为空');
        }
        res.sendSuccess(await articleService.deletedArticle(id));
    }
}