import { Controller, Get, Post, isNotInteger, isEmpty, isFalse, Format } from '../../../@common';
import { ArticleTypeService } from '../../../service/article/articleType';
import { Article } from '../../../entity/article';
import { Users } from '../../../entity/users';

/**
 * 文章controller
 * 
 * @export
 * @class ArticleController
 */
const articleTypeService = new ArticleTypeService();
@Controller('/articletype')
export class ArticleTypeController {
    /**
     * 获取文章类型列表+文章数量
     * 
     * @param {any} { query } 
     * @param {any} res 
     * @memberof ArticleTypeController
     */
    @Get('/findAllGroupType')
    async findAllGroupType(req, res) {
        res.sendSuccess(await articleTypeService.findAllGroupType());
    }
}