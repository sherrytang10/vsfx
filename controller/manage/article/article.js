import { Controller, Get, Post, Validation } from '../../../lib/@common';
import { isNotInterger, isEmpty, isFalse } from '../../../lib/@common/validate';
import { ArticleService } from '../../../service/article/article';
import { ArticleCreateDto } from './dto/article.dto';

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
    @Post('/findAll')
    async findAllArticle({ body }, res) {
        let { ArticleTypeId, type, desabled, nickName, pageSize = 20, currPage = 1 } = body;
        if (ArticleTypeId && isNotInterger(ArticleTypeId)) {
            return res.sendError('分类id类型错误');
        }
        if (type && isNotInterger(type)) {
            return res.sendError('type类型错误');
        }
        if (ArticleTypeId && isNotInterger(desabled)) {
            return res.sendError('desabled类型错误');
        }
        if (isNotInterger(pageSize) && isNotInterger(currPage)) {
            return res.sendError('分页入参类型错误');
        }
        // res.sendSuccess(await ArticleService.getAnyAll('article', { column: ['id'], where: { disabled: 1, id: 2 } }))
        res.sendSuccess(await ArticleService.findAllArticle({ ArticleTypeId, nickName, type, desabled, pageSize, currPage }));
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

    @Post('/saveOrUpdate')
    @Validation(ArticleCreateDto)
    async saveArticleInfo({ modelData, session }, res) {
        modelData.authorUserId = session.users.id;
        if (modelData.type == 1) {
            if (isEmpty(modelData.picture)) {
                return res.sendError('题图不能为空');
            }
        }
        let nowTime = (new Date()).pattern('yyyy-MM-dd hh:mm:ss');
        modelData.createTime = nowTime;
        if (!modelData.publishTime) {
            modelData.publishTime = nowTime;
        }
        if (!modelData.docreader || !modelData.docreader.replace(/\s/g, '')) {
            modelData.docreader = modelData.content.substr(0, 200);
        }
        console.log(modelData)
        res.sendSuccess(await ArticleService.saveOrUpdateAny(modelData));
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
        res.sendSuccess(await ArticleService.publishAny(id));
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
        res.sendSuccess(await ArticleService.disabledAny(id));
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
        res.sendSuccess(await ArticleService.deleteAny(id));
    }
}