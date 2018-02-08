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
const articleType_1 = require("entity/articleType");
let ArticleTypeService = class ArticleTypeService extends BaseService_1.BaseService {
    /**
     * 根据用户查询文章分类和分类总数
     *
     * @param {number} userId
     * @memberof ArticleTypeInterface
     */
    findAllGroupType(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT count(a.articleTypeId) as num, at.id as id, at.name classify 
        FROM article a LEFT JOIN article_type at ON at.id=a.articleTypeId 
        LEFT JOIN users au ON au.id=a.authorUserId 
        WHERE a.disabled=1`;
            if (userId) {
                query += ` and au.id=` + userId;
            }
            query += ' GROUP BY a.articleTypeId';
            return this.execute(query);
        });
    }
    /**
     * 获取所有分类列表
     *
     * @param {number} disabled
     * @memberof ArticleTypeInterface
     */
    findAll(disabled) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'select id, name from article_type where 1=1';
            if (_common_1.isInterger(disabled)) {
                query += ` and disabled=${disabled}`;
            }
            return this.execute(query);
        });
    }
    /**
     * 添加或保存文章
     *
     * @param {Article} article
     * @memberof ArticleInterface
     */
    saveOrUpdateArticleType(articleType) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(ArticleType).save(articleType);
            // return exe ? '操作成功' : '操作失败';
            return yield _super("saveOrUpdateAny").call(this, articleType_1.ArticleType, articleType);
        });
    }
    /**
     * 逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    disabledArticleType(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(ArticleType).updateById(id, { disabled: 0 });
            // return exe ? '禁用成功' : '禁用失败';
            return yield _super("disabledAny").call(this, articleType_1.ArticleType, id);
        });
    }
    /**
     * 恢复逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    publishArticleType(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(ArticleType).updateById(id, { disabled: 1 });
            // return exe ? '发布成功' : '发布失败';
            return yield _super("publishAny").call(this, articleType_1.ArticleType, id);
        });
    }
    /**
     * 物理删除
     *
     * @param {(number | Article)} any
     * @memberof ArticleInterface
     */
    deletedArticleType(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(ArticleType).removeById(id);
            // return exe ? '删除成功' : '删除失败';
            return yield _super("deletedAny").call(this, articleType_1.ArticleType, id);
        });
    }
};
ArticleTypeService = __decorate([
    _common_1.Service()
], ArticleTypeService);
exports.ArticleTypeService = ArticleTypeService;
