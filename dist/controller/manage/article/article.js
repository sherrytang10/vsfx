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
var _common_1 = require("../../../@common");
var article_1 = require("../../../service/article/article");
var users_1 = require("../../../entity/users");
/**
 * 文章controller
 *
 * @export
 * @class ArticleController
 */
var articleService = new article_1.ArticleService();
var ArticleController = /** @class */ (function () {
    function ArticleController() {
    }
    /**
     * 获取文章列表
     *
     * @param {any} { query }
     * @param {any} res
     * @memberof ArticleController
     */
    ArticleController.prototype.findAllArticle = function (_a, res) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var articleTypeId, type, desabled, nickName, _b, pageSize, _c, currPage, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        articleTypeId = body.articleTypeId, type = body.type, desabled = body.desabled, nickName = body.nickName, _b = body.pageSize, pageSize = _b === void 0 ? 20 : _b, _c = body.currPage, currPage = _c === void 0 ? 1 : _c;
                        if (articleTypeId && _common_1.isNotInterger(articleTypeId)) {
                            return [2 /*return*/, res.sendError('分类id类型错误')];
                        }
                        if (type && _common_1.isNotInterger(type)) {
                            return [2 /*return*/, res.sendError('type类型错误')];
                        }
                        if (articleTypeId && _common_1.isNotInterger(desabled)) {
                            return [2 /*return*/, res.sendError('desabled类型错误')];
                        }
                        if (_common_1.isNotInterger(pageSize) && _common_1.isNotInterger(currPage)) {
                            return [2 /*return*/, res.sendError('分页入参类型错误')];
                        }
                        // res.sendSuccess(await ArticleService.getAnyAll('article', { column: ['id'], where: { disabled: 1, id: 2 } }))
                        _e = (_d = res).sendSuccess;
                        return [4 /*yield*/, articleService.findAllArticle({ articleTypeId: articleTypeId, nickName: nickName, type: type, desabled: desabled, pageSize: pageSize, currPage: currPage })];
                    case 1:
                        // res.sendSuccess(await ArticleService.getAnyAll('article', { column: ['id'], where: { disabled: 1, id: 2 } }))
                        _e.apply(_d, [_f.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 根据id获取一篇文章
     *
     * @param {any} { params }
     * @param {any} res
     * @memberof ArticleController
     */
    ArticleController.prototype.getArticleInfoById = function (_a, res) {
        var id = _a.params.id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!_common_1.isNotInterger(+id)) return [3 /*break*/, 1];
                        res.sendError('入参类型错误');
                        return [3 /*break*/, 3];
                    case 1:
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, articleService.getArticleInfoById(id)];
                    case 2:
                        _c.apply(_b, [_d.sent()]);
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.saveArticleInfo = function (_a, res) {
        var body = _a.body, session = _a.session;
        return __awaiter(this, void 0, void 0, function () {
            var article, users, nowTime, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        article = body;
                        if (_common_1.isEmpty(article.title) || (article.title.length > 50)) {
                            return [2 /*return*/, res.sendError('标题长度必须为1-50个字符')];
                        }
                        if (_common_1.isEmpty(article.content)) {
                            return [2 /*return*/, res.sendError('内容不能为空')];
                        }
                        if (_common_1.isNotInterger(article.articleTypeId)) {
                            return [2 /*return*/, res.sendError('articleTypeId类型异常')];
                        }
                        users = new users_1.Users();
                        users.id = 1; //session.users.id;
                        article.users = users;
                        if (article.type == 1) {
                            if (_common_1.isEmpty(article.picture)) {
                                // return res.sendError('题图不能为空');
                            }
                        }
                        nowTime = _common_1.Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
                        article.publishDate = nowTime;
                        if (!article.publishDate) {
                            article.publishDate = nowTime;
                        }
                        if (!article.id) {
                            article.createDate = nowTime;
                        }
                        if (!article.docreader || !article.docreader.replace(/\s/g, '')) {
                            article.docreader = article.content.substr(0, 200);
                        }
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, articleService.saveOrUpdateArticle(article)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.pulishArticle = function (_a, res) {
        var query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var id, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        id = query.id;
                        if (_common_1.isNotInterger(id)) {
                            return [2 /*return*/, res.sendError('入参类型错误')];
                        }
                        if (_common_1.isFalse(id)) {
                            return [2 /*return*/, res.sendError('id不能为空')];
                        }
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, articleService.publishArticle(id)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.disabledArticle = function (_a, res) {
        var query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var id, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        id = query.id;
                        if (_common_1.isNotInterger(id)) {
                            return [2 /*return*/, res.sendError('入参类型错误')];
                        }
                        if (_common_1.isFalse(id)) {
                            return [2 /*return*/, res.sendError('id不能为空')];
                        }
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, articleService.disabledArticle(id)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.deleteArticle = function (_a, res) {
        var query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var id, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        id = query.id;
                        if (_common_1.isNotInterger(id)) {
                            return [2 /*return*/, res.sendError('入参类型错误')];
                        }
                        if (_common_1.isFalse(id)) {
                            return [2 /*return*/, res.sendError('id不能为空')];
                        }
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, articleService.deletedArticle(id)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
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
    return ArticleController;
}());
exports.ArticleController = ArticleController;
