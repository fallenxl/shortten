"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlsModule = void 0;
const common_1 = require("@nestjs/common");
const urls_controller_1 = require("./controllers/urls.controller");
const typeorm_1 = require("@nestjs/typeorm");
const url_entity_1 = require("./entities/url.entity");
const urls_service_1 = require("./services/urls.service");
const jwt_1 = require("@nestjs/jwt");
let UrlsModule = class UrlsModule {
};
exports.UrlsModule = UrlsModule;
exports.UrlsModule = UrlsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([url_entity_1.UrlEntity]), jwt_1.JwtModule],
        controllers: [urls_controller_1.UrlsController],
        providers: [urls_service_1.UrlsService],
        exports: [urls_service_1.UrlsService]
    })
], UrlsModule);
//# sourceMappingURL=urls.module.js.map