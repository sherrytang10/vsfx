import { Controller, Get, Validation } from '../../../lib/@common';
import { isNotInterger } from '../../../lib/@common/validate';
import { ArticleService } from '../../../service/article/article';

/**
 * 文章controller
 * 
 * @export
 * @class ArticleController
 */
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
        if (articleTypeId && isNotInterger(+articleTypeId)) {
            return res.sendError('入参类型错误')
        }
        if (type && isNotInterger(+type)) {
            return res.sendError('入参类型错误')
        }
        res.sendSuccess(await ArticleService.findAllArticle({ articleTypeId, type }))

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
            res.sendSuccess(await ArticleService.getArticleInfoById({ id }))
        }
    }
}