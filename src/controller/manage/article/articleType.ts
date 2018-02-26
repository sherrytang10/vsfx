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
     * 获取文章类型列表
     * 
     * @param {any} { query } 
     * @param {any} res 
     * @memberof ArticleTypeController
     */
    @Get('/findAll')
    async findAllArticleType({ body }, res) {
        let { desabled = 1 } = body;
        if (isNotInteger(desabled)) {
            return res.sendError('入参类型异常');
        }
        // res.sendSuccess(await ArticleService.getAnyAll('article', { column: ['id'], where: { disabled: 1, id: 2 } }))
        res.sendSuccess(await articleTypeService.findAll(desabled));
    }

    // @Post('/saveOrUpdate')
    // // @Validation(ArticleCreateDto)
    // async saveArticleInfo({ body, session }, res) {
    //     var article: Article = body;

    //     if (isEmpty(article.title) || (article.title.length > 50)) {
    //         return res.sendError('标题长度必须为1-50个字符');
    //     }
    //     if (isEmpty(article.content)) {
    //         return res.sendError('内容不能为空');
    //     }
    //     if (isNotInteger(article.articleTypeId)) {
    //         return res.sendError('articleTypeId类型异常');
    //     }
    //     var users = new Users();
    //     users.id = 1;//session.users.id;
    //     article.users = users;
    //     if (article.type == 1) {
    //         if (isEmpty(article.picture)) {
    //             // return res.sendError('题图不能为空');
    //         }
    //     }
    //     let nowTime = Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
    //     article.publishDate = nowTime;
    //     if (!article.publishDate) {
    //         article.publishDate = nowTime;
    //     }
    //     if (!article.id) {
    //         article.createDate = nowTime;
    //     }
    //     if (!article.docreader || !article.docreader.replace(/\s/g, '')) {
    //         article.docreader = article.content.substr(0, 200);
    //     }
    //     res.sendSuccess(await articleService.saveOrUpdateArticle(article));
    // }

    // @Get('/pulish')
    // async pulishArticle({ query }, res) {
    //     let { id } = query;
    //     if (isNotInteger(id)) {
    //         return res.sendError('入参类型错误');
    //     }
    //     if (isFalse(id)) {
    //         return res.sendError('id不能为空');
    //     }
    //     res.sendSuccess(await articleService.publishArticle(id));
    // }
    // @Get('/disabled')
    // async disabledArticle({ query }, res) {
    //     let { id } = query;
    //     if (isNotInteger(id)) {
    //         return res.sendError('入参类型错误');
    //     }
    //     if (isFalse(id)) {
    //         return res.sendError('id不能为空');
    //     }
    //     res.sendSuccess(await articleService.disabledArticle(id));
    // }
    // @Get('/delete')
    // async deleteArticle({ query }, res) {
    //     let { id } = query;
    //     if (isNotInteger(id)) {
    //         return res.sendError('入参类型错误');
    //     }
    //     if (isFalse(id)) {
    //         return res.sendError('id不能为空');
    //     }
    //     res.sendSuccess(await articleService.deletedArticle(id));
    // }
}