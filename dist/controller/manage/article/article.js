"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("../../../@common");
const article_1 = require("../../../service/article/article");
const users_1 = require("../../../entity/users");
/**
 * 文章controller
 *
 * @export
 * @class ArticleController
 */
const articleService = new article_1.ArticleService();
let ArticleController = class ArticleController {
    /**
     * 获取文章列表
     *
     * @param {any} { query }
     * @param {any} res
     * @memberof ArticleController
     */
    findAllArticle({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { articleTypeId, type, desabled, nickName, pageSize = 20, currPage = 1 } = body;
            if (articleTypeId && _common_1.isNotInterger(articleTypeId)) {
                return res.sendError('分类id类型错误');
            }
            if (type && _common_1.isNotInterger(type)) {
                return res.sendError('type类型错误');
            }
            if (articleTypeId && _common_1.isNotInterger(desabled)) {
                return res.sendError('desabled类型错误');
            }
            if (_common_1.isNotInterger(pageSize) && _common_1.isNotInterger(currPage)) {
                return res.sendError('分页入参类型错误');
            }
            // res.sendSuccess(await ArticleService.getAnyAll('article', { column: ['id'], where: { disabled: 1, id: 2 } }))
            res.sendSuccess(yield articleService.findAllArticle({ articleTypeId, nickName, type, desabled, pageSize, currPage }));
        });
    }
    /**
     * 根据id获取一篇文章
     *
     * @param {any} { params }
     * @param {any} res
     * @memberof ArticleController
     */
    getArticleInfoById({ params: { id } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_common_1.isNotInterger(+id)) {
                res.sendError('入参类型错误');
            }
            else {
                res.sendSuccess(yield articleService.getArticleInfoById(id));
            }
        });
    }
    saveArticleInfo({ body, session }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var article = body;
            if (_common_1.isEmpty(article.title) || (article.title.length > 50)) {
                return res.sendError('标题长度必须为1-50个字符');
            }
            if (_common_1.isEmpty(article.content)) {
                return res.sendError('内容不能为空');
            }
            var users = new users_1.Users();
            users.id = session.users.id;
            article.users = users;
            if (article.type == 1) {
                if (_common_1.isEmpty(article.picture)) {
                    return res.sendError('题图不能为空');
                }
            }
            let nowTime = _common_1.Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
            article.publishDate = nowTime;
            if (!article.publishDate) {
                article.publishDate = nowTime;
            }
            if (!article.docreader || !article.docreader.replace(/\s/g, '')) {
                article.docreader = article.content.substr(0, 200);
            }
            console.log(article);
            res.sendSuccess(yield articleService.saveOrUpdateArticle(article));
        });
    }
    pulishArticle({ query }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = query;
            if (_common_1.isNotInterger(id)) {
                return res.sendError('入参类型错误');
            }
            if (_common_1.isFalse(id)) {
                return res.sendError('id不能为空');
            }
            res.sendSuccess(yield articleService.publishArticle(id));
        });
    }
    disabledArticle({ query }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = query;
            if (_common_1.isNotInterger(id)) {
                return res.sendError('入参类型错误');
            }
            if (_common_1.isFalse(id)) {
                return res.sendError('id不能为空');
            }
            res.sendSuccess(yield articleService.disabledArticle(id));
        });
    }
    deleteArticle({ query }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = query;
            if (_common_1.isNotInterger(id)) {
                return res.sendError('入参类型错误');
            }
            if (_common_1.isFalse(id)) {
                return res.sendError('id不能为空');
            }
            res.sendSuccess(yield articleService.deletedArticle(id));
        });
    }
};
__decorate([
    _common_1.Post('/findAll')
], ArticleController.prototype, "findAllArticle", null);
__decorate([
    _common_1.Get('/info/:id')
], ArticleController.prototype, "getArticleInfoById", null);
__decorate([
    _common_1.Post('/saveOrUpdate')
    // @Validation(ArticleCreateDto)
], ArticleController.prototype, "saveArticleInfo", null);
__decorate([
    _common_1.Get('/pulish')
], ArticleController.prototype, "pulishArticle", null);
__decorate([
    _common_1.Get('/disabled')
], ArticleController.prototype, "disabledArticle", null);
__decorate([
    _common_1.Get('/delete')
], ArticleController.prototype, "deleteArticle", null);
ArticleController = __decorate([
    _common_1.Controller('/article')
], ArticleController);
exports.ArticleController = ArticleController;
