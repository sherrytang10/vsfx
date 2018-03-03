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
    async findAllGroupType(req, res) {
        res.sendSuccess(await ArticleTypeService.findAllGroupType());
    }
}