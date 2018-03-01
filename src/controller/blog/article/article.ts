import { Controller, Get, Post } from '../../../@common';
import { Only, isNotInteger, isEmpty, isFalse, Format } from '../../../@common/utils';
import { ArticleService } from '../../../service/article/article';
import { Article } from '../../../entity/article';
import { ArticleType } from '../../../entity/articleType';
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
    @Get('/findAll')
    async findAllArticle({ query: { articleTypeId, type } }, res) {
        if (articleTypeId && isNotInteger(articleTypeId)) {
            return res.sendError('分类id类型错误');
        }
        if (type && isNotInteger(type)) {
            return res.sendError('type类型错误');
        }
        // res.sendSuccess(await ArticleService.getAnyAll('article', { column: ['id'], where: { disabled: 1, id: 2 } }))
        res.sendSuccess(await articleService.findAllArticle({ articleTypeId, type }));
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
        if (isNotInteger(+id)) {
            res.sendError('入参类型错误')
        } else {
            res.sendSuccess(await articleService.getArticleInfoById(id))
        }
    }
}