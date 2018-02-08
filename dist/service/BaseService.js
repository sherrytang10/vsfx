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
const _common_1 = require("../@common");
let BaseService = class BaseService {
    /**
     * 添加或保存
     *
     * @param {Article} article
     * @memberof ArticleInterface
     */
    saveOrUpdateAny(Model, article) {
        return __awaiter(this, void 0, void 0, function* () {
            let exe = yield this.getRepository(Model).save(article);
            return exe ? '操作成功' : '操作失败';
        });
    }
    /**
     * 逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    disabledAny(Model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let exe = yield this.getRepository(Model).updateById(id, { disabled: 0 });
            return exe ? '禁用成功' : '禁用失败';
        });
    }
    /**
     * 恢复逻辑删除
     *
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    publishAny(Model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let exe = yield this.getRepository(Model).updateById(id, { disabled: 1 });
            return exe ? '发布成功' : '发布失败';
        });
    }
    /**
     * 物理删除
     *
     * @param {(number | Article)} any
     * @memberof ArticleInterface
     */
    deletedAny(Model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let exe = yield this.getRepository(Model).removeById(id);
            return exe ? '删除成功' : '删除失败';
        });
    }
};
BaseService = __decorate([
    _common_1.Service()
], BaseService);
exports.BaseService = BaseService;
