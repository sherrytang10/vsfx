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
const test_1 = require("../../service/test");
const test_2 = require("../../entity/test");
let usersController = class usersController {
    findOneById({ params: { id } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let testService = new test_1.TestService();
            res.sendSuccess(yield testService.getOne());
        });
    }
    update({ params: { id } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let testService = new test_1.TestService();
            res.sendSuccess(yield testService.update(id));
        });
    }
    save({ params: { sex } }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let testService = new test_1.TestService();
            let test = new test_2.Test();
            test.sex = sex;
            res.sendSuccess(yield testService.save(test));
        });
    }
};
__decorate([
    _common_1.Get('/one')
], usersController.prototype, "findOneById", null);
__decorate([
    _common_1.Get('/update/:id')
], usersController.prototype, "update", null);
__decorate([
    _common_1.Get('/save/:sex')
], usersController.prototype, "save", null);
usersController = __decorate([
    _common_1.Controller('/test')
], usersController);
exports.usersController = usersController;
