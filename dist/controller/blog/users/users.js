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
const _common_2 = require("../../../@common");
const users_1 = require("../../../service/users/users");
let UsersController = class UsersController {
    findOneById({ params: { id } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_common_2.isNotInterger(+id)) {
                return res.sendError('入参类型错误');
            }
            let usersService = new users_1.UsersService();
            res.sendSuccess(yield usersService.getUsersById(id));
        });
    }
    test(req, res, next) {
        console.log('~~~~~~');
    }
};
__decorate([
    _common_1.Get('/findOne/:id')
], UsersController.prototype, "findOneById", null);
__decorate([
    _common_1.Get('/test')
], UsersController.prototype, "test", null);
UsersController = __decorate([
    _common_1.Controller('/users')
], UsersController);
exports.UsersController = UsersController;
