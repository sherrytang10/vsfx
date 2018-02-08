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
const users_1 = require("../../../service/users/users");
const users_2 = require("../../../entity/users");
const usersService = new users_1.UsersService();
let UsersController = class UsersController {
    /**
     * 登录
     *
     * @param {any} req
     * @param {any} res
     * @returns
     * @memberof usersController
     */
    findOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { email, password: upass } = req.body;
            if (_common_1.isEmpty(email)) {
                return res.sendError('邮箱地址不能为空');
            }
            var users = yield usersService.getUsersLogin({ email });
            if (users.id) {
                let { password } = users;
                password = _common_1.Crypto.aesDecryptPipe(password);
                if (password != upass) {
                    return res.sendError('用户名或密码不正确');
                }
                req.session.users = users;
            }
            else {
                return res.sendError('用户名不存在');
            }
            res.sendSuccess({ nickName: users.nickName });
        });
    }
    /**
     * 获取所有用户
     *
     * @returns
     * @memberof usersController
     */
    findAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.sendSuccess(yield usersService.findAllUsers());
        });
    }
    /**
     * 保存用户
     *
     * @param {any} { modelData }
     * @returns
     * @memberof usersController
     */
    saveUsers({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { email, phone, password, nickName } = body;
            if (_common_1.isEmpty(email)) {
                return res.sendError('邮箱不能为空');
            }
            if (_common_1.isEmpty(password)) {
                return res.sendError('密码不能为空');
            }
            var users = yield usersService.getUsersExist({ phone, email });
            if (!users.id) {
                users.nickName = nickName || email;
                users.email = email;
                users.phone = phone;
                users.roleId = 1;
                users.createDate = _common_1.Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
                users.password = _common_1.Crypto.aesEncryptPipe(password);
                res.sendSuccess(yield usersService.saveOrUpdateUser(users));
            }
            else if (users.email == email) {
                res.sendError('邮箱已存在');
            }
            else if (users.phone == phone) {
                res.sendError('联系方式已存在');
            }
            else {
                res.sendError('未知异常');
            }
        });
    }
    /**
     * 修改用户
     *
     * @param {any} { modelData }
     * @returns
     * @memberof usersController
     */
    updateUsers({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var users = new users_2.Users();
            Object.assign(users, body);
            res.sendSuccess(yield usersService.saveOrUpdateUser(users));
        });
    }
    /**
     * 禁用某用户
     *
     * @memberof usersController
     */
    disabledUserById({ params: { id } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_common_1.isFalse(id)) {
                return res.sendError('id不能为空');
            }
            if (_common_1.isNotInterger(+id)) {
                return res.sendError('入参类型错误');
            }
            res.sendSuccess(yield usersService.disabledUsers(id));
        });
    }
    /**
     * 启用某用户
     *
     * @memberof usersController
     */
    publishUserById({ params: { id } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_common_1.isFalse(id)) {
                return res.sendError('id不能为空');
            }
            if (_common_1.isNotInterger(+id)) {
                return res.sendError('入参类型错误');
            }
            res.sendSuccess(yield usersService.publishUsers(id));
        });
    }
    /**
     * 删除某用户
     *
     * @param {any} { params: { id } }
     * @param {any} res
     * @returns
     * @memberof usersController
     */
    deleteUserById({ params: { id } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_common_1.isFalse(id)) {
                return res.sendError('id不能为空');
            }
            if (_common_1.isNotInterger(+id)) {
                return res.sendError('入参类型错误');
            }
            res.sendSuccess(yield usersService.deletedUsers(id));
        });
    }
};
__decorate([
    _common_1.Post('/login')
], UsersController.prototype, "findOneById", null);
__decorate([
    _common_1.Get('/findAll')
], UsersController.prototype, "findAllUsers", null);
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
exports.UsersController = UsersController;
