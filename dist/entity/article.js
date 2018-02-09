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
var users_1 = require("./users");
var Article = /** @class */ (function (_super) {
    __extends(Article, _super);
    function Article() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column('varchar', { length: 225, comment: '标题' })
    ], Article.prototype, "title", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return users_1.Users; }),
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
    return Article;
}(BaseEntity_1.BaseEntity));
exports.Article = Article;
