"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Test = class Test {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Test.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('enum', { enum: ['男', '女'] })
], Test.prototype, "sex", void 0);
__decorate([
    typeorm_1.Column('timestamp', { comment: '修改时间' })
], Test.prototype, "updateDate", void 0);
__decorate([
    typeorm_1.Column('datetime', { comment: '创建时间时间' })
], Test.prototype, "createDate", void 0);
Test = __decorate([
    typeorm_1.Entity('test')
], Test);
exports.Test = Test;
