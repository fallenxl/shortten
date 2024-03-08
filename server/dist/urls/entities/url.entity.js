"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlEntity = void 0;
const base_entity_1 = require("../../config/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let UrlEntity = class UrlEntity extends base_entity_1.BaseEntity {
};
exports.UrlEntity = UrlEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'original_url',
    }),
    (0, typeorm_1.Check)(`"original_url" ~* '^https?://.*$'`),
    __metadata("design:type", String)
], UrlEntity.prototype, "originalURL", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
        name: 'short_url',
    }),
    __metadata("design:type", String)
], UrlEntity.prototype, "shortURL", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 0,
    }),
    (0, typeorm_1.Check)(`"clicks" >= 0`),
    __metadata("design:type", Number)
], UrlEntity.prototype, "clicks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.urls, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], UrlEntity.prototype, "userID", void 0);
exports.UrlEntity = UrlEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'urls' })
], UrlEntity);
//# sourceMappingURL=url.entity.js.map