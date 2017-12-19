import { Controller, Get, Validation } from '../../../lib/@common';
import { isNotInterger } from '../../../lib/@common/validate';
import { ArticleLableService } from '../../../service/article/articleLable';

/**
 * 文章controller
 * 
 * @export
 * @class ArticleLableController
 */
@Controller('/articlelable')
export class ArticleLableController {
    @Get('/findAllGroupLable')
    async findAllGroupLable(req, res) {
        res.sendSuccess(await ArticleLableService.findAllGroupLable());
    }
}