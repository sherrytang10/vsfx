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
const users_1 = require("./users");
let Article = class Article extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', { length: 225, comment: '标题' })
], Article.prototype, "title", void 0);
__decorate([
    typeorm_1.OneToOne(type => users_1.Users),
    typeorm_1.JoinColumn()
], Article.prototype, "users", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255, comment: '概要' })
], Article.prototype, "docreader", void 0);
__decorate([
    typeorm_1.Column('datetime', { comment: '角色' })
], Article.prototype, "publishDate", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255, comment: '文图', nullable: true })
], Article.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column('blob', { comment: '内容' })
], Article.prototype, "content", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 2555, comment: '标签', nullable: true })
], Article.prototype, "labelIds", void 0);
__decorate([
    typeorm_1.Column('int', { length: 11, comment: '分类' })
], Article.prototype, "articleTypeId", void 0);
__decorate([
    typeorm_1.Column('int', { length: 11, comment: '赞', nullable: true })
], Article.prototype, "praise", void 0);
__decorate([
    typeorm_1.Column('int', { length: 11, comment: '访问量', nullable: true })
], Article.prototype, "visitors", void 0);
__decorate([
    typeorm_1.Column('int', { length: 225, comment: '1 文章 2是短记', nullable: true })
], Article.prototype, "type", void 0);
Article = __decorate([
    typeorm_1.Entity('article')
], Article);
exports.Article = Article;
