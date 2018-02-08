"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
let Users = class Users extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', { length: 30, comment: '用户真实姓名', nullable: true })
], Users.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 100, comment: '电子邮箱' })
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200, comment: '密码' })
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('int', { length: 11, comment: '角色' })
], Users.prototype, "roleId", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 20, comment: '用户昵称' })
], Users.prototype, "nickName", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255, comment: '用户头像', nullable: true })
], Users.prototype, "headimg", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 20, comment: '联系方式', nullable: true })
], Users.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 100, comment: '座右铭', nullable: true })
], Users.prototype, "motto", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 225, comment: '掘金主页', nullable: true })
], Users.prototype, "juejin", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 225, comment: '知乎主页', nullable: true })
], Users.prototype, "zhihu", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 225, comment: 'github主页', nullable: true })
], Users.prototype, "github", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 225, comment: '简书主页', nullable: true })
], Users.prototype, "jianshu", void 0);
Users = __decorate([
    typeorm_1.Entity('users')
], Users);
exports.Users = Users;
