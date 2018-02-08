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
const users_1 = require("../../entity/users");
let UsersService = class UsersService extends BaseService_1.BaseService {
    /**
     * 根据id获取用户信息   不带邮箱、密码等信息
     *
     * @param {any} id
     * @returns
     * @memberof UsersService
     */
    getUsersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield this.getRepository(users_1.Users).findOneById(id);
            return users || {};
        });
    }
    /**
     * 登录 根据email获取登录信息
     *
     * @param {any} { email }
     * @returns
     * @memberof UsersService
     */
    getUsersLogin({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select * from users where disabled = 1 and  email = "${email}"`;
            let users = yield this.execute(sql);
            return users[0] || {};
        });
    }
    /**
     * 根据email、phone查询用户是否存在
     *
     * @param {any} { email }
     * @returns
     * @memberof UsersService
     */
    getUsersExist({ email, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select * from users where phone='${phone}' or email='${email}'`;
            let users = yield this.execute(sql);
            return users[0] || {};
        });
    }
    /**
     * 获取所有用户列表
     *
     * @memberof UsersService
     */
    findAllUsers(disabled) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select * from users where 1=1`;
            if (disabled || disabled == 0) {
                sql += ' and disabled = ' + disabled;
            }
            return yield this.execute(sql);
        });
    }
    /**
     * 添加或修改用户
     *
     * @param {Users} users
     * @returns {Promise<string>}
     * @memberof UsersService
     */
    saveOrUpdateUser(users) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Users).save(users);
            // return exe ? '操作成功' : '操作失败';
            return yield _super("saveOrUpdateAny").call(this, users_1.Users, users);
        });
    }
    /**
     * 逻辑删除
     *
     * @param {(number | Users)}
     * @memberof UsersInterface
     */
    disabledUsers(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Users).updateById(id, { disabled: 0 });
            // return exe ? '禁用成功' : '禁用失败';
            return yield _super("disabledAny").call(this, users_1.Users, id);
        });
    }
    /**
     * 恢复逻辑删除
     *
     * @param {(number | Users)}
     * @memberof UsersInterface
     */
    publishUsers(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Users).updateById(id, { disabled: 1 });
            // return exe ? '发布成功' : '发布失败';
            return yield _super("publishAny").call(this, users_1.Users, id);
        });
    }
    /**
     * 物理删除
     *
     * @param {(number | Users)} any
     * @memberof UsersInterface
     */
    deletedUsers(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // let exe = await this.getRepository(Users).removeById(id);
            // return exe ? '删除成功' : '删除失败';
            return yield _super("deletedAny").call(this, users_1.Users, id);
        });
    }
};
UsersService = __decorate([
    _common_1.Service()
], UsersService);
exports.UsersService = UsersService;
