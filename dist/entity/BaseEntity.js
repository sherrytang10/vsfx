"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class BaseEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], BaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int', { default: 1, comment: '1可用，0禁用' })
], BaseEntity.prototype, "disabled", void 0);
__decorate([
    typeorm_1.Column('timestamp', { comment: '修改时间' })
], BaseEntity.prototype, "updateDate", void 0);
__decorate([
    typeorm_1.Column('datetime', { comment: '创建时间时间' })
], BaseEntity.prototype, "createDate", void 0);
exports.BaseEntity = BaseEntity;
