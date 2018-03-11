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
var users_1 = require("../../entity/users");
var UsersService = /** @class */ (function (_super) {
    __extends(UsersService, _super);
    function UsersService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 根据id获取用户信息   不带邮箱、密码等信息
     *
     * @param {any} id
     * @returns
     * @memberof UsersService
     */
    UsersService.prototype.getUsersById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var users, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = {};
                        if (!id || id == 0)
                            return [2 /*return*/, users];
                        query = this.getRepository(users_1.Users).createQueryBuilder("users")
                            .leftJoinAndSelect('users.usersRole', 'usersRole')
                            .select([
                            'users.id id',
                            'users.nickName nickName',
                            'users.userName userName',
                            'users.password password',
                            'users.email email',
                            'users.phone phone',
                            'users.motto metto',
                            'users.headimg headimg',
                            'usersRole.id roleId',
                            'usersRole.name roleName'
                        ]).where('users.id=:id', { id: id });
                        return [4 /*yield*/, query.printSql().getRawOne()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users || {}];
                }
            });
        });
    };
    /**
     * 登录 根据email获取登录信息
     *
     * @param {any} { email }
     * @returns
     * @memberof UsersService
     */
    UsersService.prototype.getUsersLogin = function (_a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var query, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = this.getRepository(users_1.Users).createQueryBuilder("users")
                            .leftJoinAndSelect('users.usersRole', 'usersRole')
                            .select([
                            'users.id id',
                            'users.nickName nickName',
                            // 'users.userName userName',
                            'users.password password',
                            'users.email email',
                            'users.phone phone',
                            'users.motto metto',
                            'users.headimg headimg',
                            'usersRole.id roleId',
                            'usersRole.name roleName'
                        ]).where('1=1');
                        if (email) {
                            query = query.andWhere('email=:email', { email: email });
                        }
                        return [4 /*yield*/, query.printSql().getRawOne()];
                    case 1:
                        users = _b.sent();
                        return [2 /*return*/, users || {}];
                }
            });
        });
    };
    /**
     * 根据email、phone查询用户是否存在
     *
     * @param {any} { email }
     * @returns
     * @memberof UsersService
     */
    UsersService.prototype.getUsersExist = function (_a) {
        var email = _a.email, phone = _a.phone;
        return __awaiter(this, void 0, void 0, function () {
            var sql, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "select * from users where phone='" + phone + "' or email='" + email + "'";
                        return [4 /*yield*/, this.execute(sql)];
                    case 1:
                        users = _b.sent();
                        return [2 /*return*/, users || []];
                }
            });
        });
    };
    /**
     * 获取所有用户列表
     *
     * @memberof UsersService
     */
    UsersService.prototype.findAllUsers = function (disabled) {
        return __awaiter(this, void 0, void 0, function () {
            var query, usersList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.getRepository(users_1.Users).createQueryBuilder("users")
                            .leftJoinAndSelect('users.usersRole', 'usersRole')
                            .select([
                            'users.id id',
                            'users.nickName nickName',
                            // 'users.userName userName',
                            'users.email email',
                            'users.phone phone',
                            'users.motto metto',
                            'users.headimg headimg',
                            'usersRole.id roleId',
                            'usersRole.name roleName'
                        ]).where('1=1');
                        if (disabled || disabled == 0) {
                            query = query.andWhere('disabled=:disabled', { disabled: disabled });
                        }
                        return [4 /*yield*/, query.skip(0).take(100).printSql().getRawMany()];
                    case 1:
                        usersList = _a.sent();
                        return [2 /*return*/, usersList];
                }
            });
        });
    };
    UsersService.prototype.getAuthorList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRepository(users_1.Users).query("select count(u.id) count, u.identity, u.nickName, u.motto from users u, article at where u.disabled = 1 and `at`.disabled = 1 and u.id = `at`.usersId group by u.id")];
                    case 1:
                        usersList = _a.sent();
                        return [2 /*return*/, usersList];
                }
            });
        });
    };
    UsersService.prototype.getUsersByIdentity = function (identity) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRepository(users_1.Users).createQueryBuilder("users")
                            .leftJoinAndSelect('users.usersRole', 'usersRole')
                            .select([
                            'users.id id',
                            'users.nickName nickName',
                            // 'users.userName userName',
                            'users.password password',
                            'users.email email',
                            'users.phone phone',
                            'users.motto metto',
                            'users.headimg headimg',
                            'usersRole.id roleId',
                            'usersRole.name roleName'
                        ]).where('users.identity=:identity', { identity: identity }).getRawOne()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users || {}];
                }
            });
        });
    };
    /**
     * 添加或修改用户
     *
     * @param {Users} users
     * @returns {Promise<string>}
     * @memberof UsersService
     */
    UsersService.prototype.saveOrUpdateUser = function (users) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.saveOrUpdateAny.call(this, users_1.Users, users)];
                    case 1: 
                    // let exe = await this.getRepository(Users).save(users);
                    // return exe ? '操作成功' : '操作失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 逻辑删除
     *
     * @param {(number | Users)}
     * @memberof UsersInterface
     */
    UsersService.prototype.disabledUsers = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.disabledAny.call(this, users_1.Users, id)];
                    case 1: 
                    // let exe = await this.getRepository(Users).updateById(id, { disabled: 0 });
                    // return exe ? '禁用成功' : '禁用失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 恢复逻辑删除
     *
     * @param {(number | Users)}
     * @memberof UsersInterface
     */
    UsersService.prototype.publishUsers = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.publishAny.call(this, users_1.Users, id)];
                    case 1: 
                    // let exe = await this.getRepository(Users).updateById(id, { disabled: 1 });
                    // return exe ? '发布成功' : '发布失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 物理删除
     *
     * @param {(number | Users)} any
     * @memberof UsersInterface
     */
    UsersService.prototype.deletedUsers = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.deletedAny.call(this, users_1.Users, id)];
                    case 1: 
                    // let exe = await this.getRepository(Users).removeById(id);
                    // return exe ? '删除成功' : '删除失败';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService = __decorate([
        _common_1.Service()
    ], UsersService);
    return UsersService;
}(BaseService_1.BaseService));
exports.UsersService = UsersService;
