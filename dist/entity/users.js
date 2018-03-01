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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var usersRole_1 = require("./usersRole");
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
        typeorm_1.OneToOne(function (type) { return usersRole_1.UsersRole; }),
        typeorm_1.JoinColumn()
    ], Users.prototype, "usersRole", void 0);
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
    return Users;
}(BaseEntity_1.BaseEntity));
exports.Users = Users;
