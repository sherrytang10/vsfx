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
const _common_1 = require("../../@common");
const BaseService_1 = require("../BaseService");
const article_1 = require("../../entity/article");
let ArticleService = class ArticleService extends BaseService_1.BaseService {
    /**
     * 获取所有文章列表
     *
     * @param {Article} article
     * @memberof ArticleInterface
     */
    findAllArticle({ articleTypeId = 0, type = 0, nickName = '', desabled = null, pageSize = 20, currPage = 1 }) {
        return __awaiter(this, void 0, void 0, function* () {
            let [articleList, [{ total }]] = yield this.execute(`call getArticleList(${articleTypeId}, ${type}, ${desabled},${nickName || null},${currPage}, ${pageSize})`);
            return { articleList, total };
        });
    }
    /**
     * 获取文章详情
     *
     * @param {number} id
     * @memberof ArticleInterface
     */
    getArticleInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select a.id, a.title,a.type,a.articleTypeId,at.name articleTypeName,au.nickName,a.docreader,
        a.labelIds,a.picture,a.praise,a.visitors, cast(a.content as char) content, date_format(a.publishTime, "%Y-%m-%d %H:%I:%S") publishTime
        from article a, article_type at, users au 
        where at.id = a.articleTypeId and au.id = a.authorUserId`;
            sql += ' and a.id = ' + id;
            let result = yield this.execute(sql);
            return result[0];
        });
    }
    /**
     * 添加或保存文章
     *
     * @param {Article} article
     * @memberof ArticleInterface
     */
    saveOrUpdateArticle(article) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Article).save(article);
            // return exe ? '操作成功' : '操作失败';
            return yield _super("saveOrUpdateAny").call(this, article_1.Article, article);
        });
    }
    /**
     * 逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    disabledArticle(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Article).updateById(id, { disabled: 0 });
            // return exe ? '禁用成功' : '禁用失败';
            return yield _super("disabledAny").call(this, article_1.Article, id);
        });
    }
    /**
     * 恢复逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    publishArticle(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Article).updateById(id, { disabled: 1 });
            // return exe ? '发布成功' : '发布失败';
            return yield _super("publishAny").call(this, article_1.Article, id);
        });
    }
    /**
     * 物理删除
     *
     * @param {(number | Article)} any
     * @memberof ArticleInterface
     */
    deletedArticle(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Article).removeById(id);
            // return exe ? '删除成功' : '删除失败';
            return yield _super("deletedAny").call(this, article_1.Article, id);
        });
    }
};
ArticleService = __decorate([
    _common_1.Service()
], ArticleService);
exports.ArticleService = ArticleService;
