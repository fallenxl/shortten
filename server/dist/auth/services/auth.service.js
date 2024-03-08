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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/services/users.service");
const dotenv = require("dotenv");
dotenv.config();
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUserByGoogle(req) {
        try {
            const payload = {
                email: req.user.email,
                avatar: req.user.photo,
                name: req.user.name,
                providerID: 'google',
                providerKey: req.user.googleId,
            };
            const user = await this.usersService.create(payload);
            const token = this.jwtService.sign({ sub: user.id }, {
                secret: process.env.JWT_SECRET,
                expiresIn: '365d',
            });
            return {
                avatar: user.avatar,
                email: user.email,
                name: user.name,
                access_token: token,
            };
        }
        catch (error) {
            return {
                message: 'Error',
                error: error.message,
            };
        }
    }
    async validateUserByGithub(req) {
        try {
            const payload = {
                email: req.user.email,
                avatar: req.user.photo,
                name: req.user.name,
                providerID: 'github',
                providerKey: req.user.githubId,
            };
            if (!payload.email) {
                throw new common_1.HttpException('Email is required, please check your Github account settings', common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.usersService.create(payload);
            const token = this.jwtService.sign({ sub: user.id }, {
                secret: process.env.JWT_SECRET,
                expiresIn: '365d',
            });
            return {
                avatar: user.avatar,
                email: user.email,
                name: user.name,
                access_token: token,
            };
        }
        catch (error) {
            return {
                message: 'Error',
                error: error.message,
            };
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "validateUserByGoogle", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "validateUserByGithub", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map