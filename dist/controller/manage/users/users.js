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
var utils_1 = require("../../../@common/utils");
// import { randomBytes } from 'crypto';
var users_1 = require("../../../service/users/users");
var article_1 = require("../../../service/article/article");
var users_2 = require("../../../entity/users");
var usersService = new users_1.UsersService();
var articleService = new article_1.ArticleService();
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    /**
     * 登录
     *
     * @param {any} req
     * @param {any} res
     * @returns
     * @memberof usersController
     */
    UsersController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, upass, users, password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, upass = _a.password;
                        if (utils_1.isEmpty(email)) {
                            return [2 /*return*/, res.sendError('邮箱地址不能为空')];
                        }
                        return [4 /*yield*/, usersService.getUsersLogin({ email: email })];
                    case 1:
                        users = _b.sent();
                        if (users.id) {
                            password = users.password;
                            password = _common_1.Crypto.aesDecryptPipe(password);
                            if (password != upass) {
                                return [2 /*return*/, res.sendError('用户名或密码不正确')];
                            }
                            req.session.users = users;
                        }
                        else {
                            return [2 /*return*/, res.sendError('用户名不存在')];
                        }
                        res.sendSuccess({ nickName: users.nickName });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取所有用户
     *
     * @returns
     * @memberof usersController
     */
    UsersController.prototype.findAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).sendSuccess;
                        return [4 /*yield*/, usersService.findAllUsers()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getOneById = function (_a, res) {
        var query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var id, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = query.id;
                        if (utils_1.isNotInteger(id)) {
                            return [2 /*return*/, res.sendError('入参格式不正确')];
                        }
                        return [4 /*yield*/, usersService.getUsersById(id)];
                    case 1:
                        users = _b.sent();
                        if (users.password) {
                            users.password = _common_1.Crypto.aesDecryptPipe(users.password);
                        }
                        return [2 /*return*/, res.sendSuccess(users)];
                }
            });
        });
    };
    /**
     * 保存用户
     *
     * @param {any} { modelData }
     * @returns
     * @memberof usersController
     */
    UsersController.prototype.saveUsers = function (_a, res) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var _b, id, email, _c, phone, _d, userName, password, nickName, roleId, usersList, operUsers, checkUser, users, usersRole, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _b = body.id, id = _b === void 0 ? 0 : _b, email = body.email, _c = body.phone, phone = _c === void 0 ? '' : _c, _d = body.userName, userName = _d === void 0 ? '' : _d, password = body.password, nickName = body.nickName, roleId = body.roleId;
                        if (utils_1.isEmpty(email)) {
                            return [2 /*return*/, res.sendError('邮箱不能为空')];
                        }
                        if (!utils_1.isEmail(email)) {
                            return [2 /*return*/, res.sendError('邮箱格式不正确')];
                        }
                        if (utils_1.isEmpty(nickName)) {
                            return [2 /*return*/, res.sendError('昵称不能为空')];
                        }
                        if (!/^[a-zA-Z\.\s\u4e00-\u9fa5]{2,20}$/.test(nickName)) {
                            return [2 /*return*/, res.sendError('用户昵称为长度 2 到 8 个中文字符或者 2 到 20 个英文字符')];
                        }
                        if (utils_1.isEmpty(password)) {
                            return [2 /*return*/, res.sendError('密码不能为空')];
                        }
                        if (!/^[\w\.\s\!\@\#\$\%\^\.\,\/\?\>\<\(\)\-\_\=\+\`\~]{6,26}$/.test(password)) {
                            return [2 /*return*/, res.sendError('密码必须为长度6 到 26 个字符')];
                        }
                        if (utils_1.isNotInteger(roleId)) {
                            return [2 /*return*/, res.sendError('请选择正确的用户组')];
                        }
                        if (_common_1.isNotEmpty(userName) && !/^([\u4e00-\u9fa5][a-zA-Z\.\s]{2,20})$/.test(userName)) {
                            return [2 /*return*/, res.sendError('用户名为长度 2 到 8 个中文字符或者 2 到 20 个英文字符')];
                        }
                        if (_common_1.isNotEmpty(phone) && !/^1\d{10}$/.test(phone)) {
                            return [2 /*return*/, res.sendError('请填写11位长度的手机号码')];
                        }
                        return [4 /*yield*/, usersService.getUsersExist({ phone: phone, email: email })];
                    case 1:
                        usersList = _g.sent();
                        operUsers = {};
                        if (!id) return [3 /*break*/, 3];
                        return [4 /*yield*/, usersService.getUsersById(id)];
                    case 2:
                        operUsers = _g.sent();
                        _g.label = 3;
                    case 3:
                        checkUser = usersList.some(function (item) {
                            if (email && item.email == email) {
                                if (operUsers.email && operUsers.email != email) {
                                    return res.sendError('邮箱已存在');
                                }
                            }
                            else if (phone && item.phone == phone && phone != operUsers.phone) {
                                if (operUsers.phone && operUsers.phone != phone) {
                                    return res.sendError('联系方式已存在');
                                }
                            }
                            else {
                                if (!operUsers.id) {
                                    return res.sendError('未知异常');
                                }
                            }
                            return true;
                        });
                        if (!operUsers) return [3 /*break*/, 5];
                        users = {};
                        usersRole = {};
                        users.nickName = nickName || email;
                        users.email = email;
                        users.phone = phone;
                        users.userName = userName;
                        usersRole.id = roleId;
                        users.usersRole = usersRole;
                        users.createDate = utils_1.Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
                        users.password = _common_1.Crypto.aesEncryptPipe(password);
                        // users.identity = randomBytes(15).toString('hex');
                        users.identity = (new Buffer(email)).toString('base64');
                        if (id) {
                            users.id = id;
                        }
                        _f = (_e = res).sendSuccess;
                        return [4 /*yield*/, usersService.saveOrUpdateUser(users)];
                    case 4:
                        _f.apply(_e, [_g.sent()]);
                        _g.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 修改用户
     *
     * @param {any} { modelData }
     * @returns
     * @memberof usersController
     */
    UsersController.prototype.updateUsers = function (_a, res) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var users, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        users = new users_2.Users();
                        Object.assign(users, body);
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, usersService.saveOrUpdateUser(users)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 禁用某用户
     *
     * @memberof usersController
     */
    UsersController.prototype.disabledUserById = function (_a, res) {
        var id = _a.params.id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (utils_1.isFalse(id)) {
                            return [2 /*return*/, res.sendError('id不能为空')];
                        }
                        if (utils_1.isNotInteger(+id)) {
                            return [2 /*return*/, res.sendError('入参类型错误')];
                        }
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, usersService.disabledUsers(id)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 启用某用户
     *
     * @memberof usersController
     */
    UsersController.prototype.publishUserById = function (_a, res) {
        var id = _a.params.id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (utils_1.isFalse(id)) {
                            return [2 /*return*/, res.sendError('id不能为空')];
                        }
                        if (utils_1.isNotInteger(+id)) {
                            return [2 /*return*/, res.sendError('入参类型错误')];
                        }
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, usersService.publishUsers(id)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除某用户
     *
     * @param {any} { params: { id } }
     * @param {any} res
     * @returns
     * @memberof usersController
     */
    UsersController.prototype.deleteUserById = function (_a, res) {
        var id = _a.params.id, session = _a.session;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        try {
                            if (session.users.UsersRole.id != 1) {
                                return [2 /*return*/, res.sendError('没有权限', 997)];
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, res.sendError('没有权限', 997)];
                        }
                        if (utils_1.isFalse(id)) {
                            return [2 /*return*/, res.sendError('id不能为空')];
                        }
                        if (utils_1.isNotInteger(+id)) {
                            return [2 /*return*/, res.sendError('入参类型错误')];
                        }
                        return [4 /*yield*/, articleService.deletedArticlesByUsersId(id)];
                    case 1:
                        _d.sent();
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, usersService.deletedUsers(id)];
                    case 2:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        _common_1.Post('/login')
    ], UsersController.prototype, "login", null);
    __decorate([
        _common_1.Get('/findAll')
    ], UsersController.prototype, "findAllUsers", null);
    __decorate([
        _common_1.Get('/getOneById')
    ], UsersController.prototype, "getOneById", null);
    __decorate([
        _common_1.Post('/save')
        // @Validation(UsersCreateDto)
    ], UsersController.prototype, "saveUsers", null);
    __decorate([
        _common_1.Post('/update')
        // @Validation(UsersUpdateDto)
    ], UsersController.prototype, "updateUsers", null);
    __decorate([
        _common_1.Get('/disabled/:id')
    ], UsersController.prototype, "disabledUserById", null);
    __decorate([
        _common_1.Get('/publish/:id')
    ], UsersController.prototype, "publishUserById", null);
    __decorate([
        _common_1.Get('/delete/:id')
    ], UsersController.prototype, "deleteUserById", null);
    UsersController = __decorate([
        _common_1.Controller('/users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
