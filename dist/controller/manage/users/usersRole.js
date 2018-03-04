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
var usersRole_1 = require("../../../service/users/usersRole");
/**
 * 文章controller
 *
 * @export
 * @class ArticleController
 */
var usersRoleService = new usersRole_1.UsersRoleService();
var UsersRoleController = /** @class */ (function () {
    function UsersRoleController() {
    }
    /**
     * 获取文章类型列表
     *
     * @param {any} { query }
     * @param {any} res
     * @memberof UsersRoleController
     */
    UsersRoleController.prototype.findAllUsersRole = function (_a, res) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var _b, desabled, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = body.desabled, desabled = _b === void 0 ? 1 : _b;
                        if (_common_1.isNotInteger(desabled)) {
                            return [2 /*return*/, res.sendError('入参类型异常')];
                        }
                        _d = (_c = res).sendSuccess;
                        return [4 /*yield*/, usersRoleService.findAllUsersRole(desabled)];
                    case 1:
                        _d.apply(_c, [_e.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersRoleController.prototype.saveUsersRoleInfo = function (_a, res) {
        var body = _a.body, session = _a.session;
        return __awaiter(this, void 0, void 0, function () {
            var usersRole, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        usersRole = {};
                        if (_common_1.isNotEmpty(body.id)) {
                            if (_common_1.isInteger(body.id)) {
                                usersRole.id = body.id;
                            }
                            else {
                                return [2 /*return*/, res.sendError('id入参类型异常')];
                            }
                        }
                        if (_common_1.isEmpty(body.name) || (body.name.length > 25)) {
                            return [2 /*return*/, res.sendError('标题长度必须为1-25个字符')];
                        }
                        usersRole.name = body.name;
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, usersRoleService.saveOrUpdateUsersRole(usersRole)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersRoleController.prototype.deleteUsersRole = function (_a, res) {
        var query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var id, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        id = query.id;
                        if (_common_1.isNotInteger(id)) {
                            return [2 /*return*/, res.sendError('入参类型错误')];
                        }
                        if (_common_1.isFalse(id)) {
                            return [2 /*return*/, res.sendError('id不能为空')];
                        }
                        _c = (_b = res).sendSuccess;
                        return [4 /*yield*/, usersRoleService.deletedUsersRole(id)];
                    case 1:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        _common_1.Get('/findAll')
    ], UsersRoleController.prototype, "findAllUsersRole", null);
    __decorate([
        _common_1.Post('/saveOrUpdate')
        // @Validation(ArticleCreateDto)
    ], UsersRoleController.prototype, "saveUsersRoleInfo", null);
    __decorate([
        _common_1.Get('/delete')
    ], UsersRoleController.prototype, "deleteUsersRole", null);
    UsersRoleController = __decorate([
        _common_1.Controller('/usersrole')
    ], UsersRoleController);
    return UsersRoleController;
}());
exports.UsersRoleController = UsersRoleController;