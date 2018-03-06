"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("../../@common");
var BaseService_1 = require("../BaseService");
var article_1 = require("../../entity/article");
var ArticleService = /** @class */ (function (_super) {
    __extends(ArticleService, _super);
    function ArticleService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取所有文章列表
     *
     * @param {Article} article
     * @memberof ArticleInterface
     */
    ArticleService.prototype.findAllArticle = function (_a) {
        var _b = _a.articleTypeId, articleTypeId = _b === void 0 ? 0 : _b, _c = _a.type, type = _c === void 0 ? 0 : _c, _d = _a.identity, identity = _d === void 0 ? '' : _d, _e = _a.nickName, nickName = _e === void 0 ? '' : _e, _f = _a.desabled, desabled = _f === void 0 ? null : _f, _g = _a.pageSize, pageSize = _g === void 0 ? 20 : _g, _h = _a.currPage, currPage = _h === void 0 ? 1 : _h;
        return __awaiter(this, void 0, void 0, function () {
            var query, articleList, total;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        query = this.getRepository(article_1.Article).createQueryBuilder("article")
                            .leftJoinAndSelect('article.users', 'users')
                            .leftJoinAndSelect('article.articleType', 'articleType')
                            .select([
                            'date_format(article.publishDate, "%Y-%m-%d %H:%I:%S") publishDate',
                            'article.title title',
                            // 'article.labelIds labelIds',
                            // 'date_format(a.createDate, "%Y-%m-%d %H:%I:%S") createDate',
                            'article.docreader docreader',
                            'article.id id',
                            'article.visitors visitors',
                            // 'cast(article.content as char) content',
                            'article.praise praise',
                            'article.picture picture',
                            'articleType.id articleTypeId',
                            'articleType.name articleTypeName',
                            'article.disabled disabled',
                            'article.type type',
                            'users.id usersId',
                            'users.nickName nickName'
                        ]);
                        query = query.where('1=1');
                        if (type) {
                            query = query.andWhere('article.type=:type', { type: type });
                        }
                        if (identity) {
                            query = query.andWhere('users.identity=:identity', { identity: identity });
                        }
                        return [4 /*yield*/, query.orderBy('article.publishDate', 'desc').skip(currPage - 1).take(pageSize).getRawMany()];
                    case 1:
                        articleList = _j.sent();
                        return [4 /*yield*/, this.getRepository(article_1.Article).count()];
                    case 2:
                        total = _j.sent();
                        return [2 /*return*/, { articleList: articleList, total: total }];
                }
            });
        });
    };
    /**
     * 获取文章详情
     *
     * @param {number} id
     * @memberof ArticleInterface
     */
    ArticleService.prototype.getArticleInfoById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRepository(article_1.Article).createQueryBuilder("article")
                            .leftJoinAndSelect('article.users', 'users')
                            .leftJoinAndSelect('article.articleType', 'articleType')
                            .select([
                            'article.id id',
                            'article.title title',
                            'article.type type',
                            'article.docreader docreader',
                            'article.picture picture',
                            'article.visitors visitors',
                            'article.praise praise',
                            'cast(article.content as char) content',
                            'date_format(article.publishDate, "%Y-%m-%d %H:%I:%S") publishDate',
                            'article.disabled disabled',
                            'articleType.id articleTypeId',
                            'articleType.name articleTypeName',
                            'users.id usersId',
                            'users.nickName nickName'
                        ]).where('article.id=:id', { id: id }).getRawOne()];
                    case 1:
                        article = _a.sent();
                        this.getRepository(article_1.Article).updateById(id, { visitors: ++article.visitors });
                        return [2 /*return*/, article || {}];
                }
            });
        });
    };
    /**
     * 添加或保存文章
     *
     * @param {Article} article
     * @memberof ArticleInterface
     */
    ArticleService.prototype.saveOrUpdateArticle = function (article) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.saveOrUpdateAny.call(this, article_1.Article, article)];
                    case 1: 
                    // let exe = await this.getRepository(Article).save(article);
                    // return exe ? '操作成功' : '操作失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    ArticleService.prototype.disabledArticle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.disabledAny.call(this, article_1.Article, id)];
                    case 1: 
                    // let exe = await this.getRepository(Article).updateById(id, { disabled: 0 });
                    // return exe ? '禁用成功' : '禁用失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 恢复逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    ArticleService.prototype.publishArticle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.publishAny.call(this, article_1.Article, id)];
                    case 1: 
                    // let exe = await this.getRepository(Article).updateById(id, { disabled: 1 });
                    // return exe ? '发布成功' : '发布失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 物理删除
     *
     * @param {(number | Article)} any
     * @memberof ArticleInterface
     */
    ArticleService.prototype.deletedArticle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.deletedAny.call(this, article_1.Article, id)];
                    case 1: 
                    // let exe = await this.getRepository(Article).removeById(id);
                    // return exe ? '删除成功' : '删除失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleService.prototype.deletedArticlesByUsersId = function (usersId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection().createQueryBuilder().delete().from(article_1.Article).where("users.id = :usersId", { usersId: usersId }).execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, '操作成功'];
                }
            });
        });
    };
    ArticleService = __decorate([
        _common_1.Service()
    ], ArticleService);
    return ArticleService;
}(BaseService_1.BaseService));
exports.ArticleService = ArticleService;
