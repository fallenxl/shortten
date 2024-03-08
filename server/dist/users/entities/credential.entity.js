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
exports.CredentialsEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let CredentialsEntity = class CredentialsEntity {
};
exports.CredentialsEntity = CredentialsEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: 'enum',
        enum: ['google', 'github'],
        name: 'provider_id',
    }),
    __metadata("design:type", String)
], CredentialsEntity.prototype, "providerID", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: 'varchar',
        length: 255,
        name: 'provider_key',
    }),
    __metadata("design:type", String)
], CredentialsEntity.prototype, "providerKey", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.id, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], CredentialsEntity.prototype, "userID", void 0);
exports.CredentialsEntity = CredentialsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'credentials' })
], CredentialsEntity);
//# sourceMappingURL=credential.entity.js.map