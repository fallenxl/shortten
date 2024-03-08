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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlsController = void 0;
const common_1 = require("@nestjs/common");
const create_url_dto_1 = require("../dto/create-url.dto");
const update_url_dto_1 = require("../dto/update-url.dto");
const urls_service_1 = require("../services/urls.service");
const auth_guard_1 = require("../../auth/guards/auth.guard");
let UrlsController = class UrlsController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    create(createUrlDto, req) {
        return this.urlService.create(createUrlDto, req);
    }
    findAll(req) {
        return this.urlService.getURLsByUser(req);
    }
    update(id, updateUrlDto) {
        return this.urlService.updateURL(id, updateUrlDto);
    }
    remove(id) {
        return this.urlService.remove(id);
    }
};
exports.UrlsController = UrlsController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_url_dto_1.CreateUrlDto, Object]),
    __metadata("design:returntype", void 0)
], UrlsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UrlsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_url_dto_1.UpdateUrlDto]),
    __metadata("design:returntype", void 0)
], UrlsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrlsController.prototype, "remove", null);
exports.UrlsController = UrlsController = __decorate([
    (0, common_1.Controller)('url'),
    __metadata("design:paramtypes", [urls_service_1.UrlsService])
], UrlsController);
//# sourceMappingURL=urls.controller.js.map