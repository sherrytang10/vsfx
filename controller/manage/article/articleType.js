import { Controller, Get, Validation } from '../../../lib/@common';
import { isNotInterger } from '../../../lib/@common/validate';
import { ArticleTypeService } from '../../../service/article/articleType';

/**
 * 文章controller
 * 
 * @export
 * @class ArticleTypeController
 */
@Controller('/articletype')
export class ArticleTypeController {
    @Get('/findAllGroupType')
    async findAllGroupType() {
        return {
            status: 1,
            results: await ArticleTypeService.findAllGroupType()
        };
    }

    @Get('/findAll')
    async findAllArticleType() {
        return {
            status: 1,
            results: await ArticleTypeService.findAll({ disabled: 1 })
        };
    }
}