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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("@decorators/express");
const di_1 = require("@decorators/di");
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../services/auth");
const logger_1 = __importDefault(require("../modules/logger"));
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const passport_2 = require("../modules/passport");
const constants_1 = require("../constants");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        logger_1.default.log('AuthController Attached!');
    }
    async refreshAccessToken(req, res) {
        const { id } = req.user;
        if (!id)
            return res.status(HttpStatusCode_1.default.UNAUTHORIZED).json('Unauthorized');
        const accessToken = this.authService.createAccessTokenByUserId(id);
        return res.status(HttpStatusCode_1.default.OK).json({ accessToken });
    }
    async checkAccessTokenIsValid(res) {
        return res.status(HttpStatusCode_1.default.OK).json('valid');
    }
    async getUser(req, res) {
        return res.status(HttpStatusCode_1.default.OK).json(req.user);
    }
    googleLogin() { }
    async googleRedirect(req, res) {
        let { user } = req;
        if (!user)
            return res.sendStatus(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
        const { email } = user;
        let savedUser = await this.authService.getUserByEmail(email);
        if (!savedUser)
            savedUser = await this.authService.createAndGetUser(user);
        const refreshToken = await this.authService.createAndGetRefreshTokenByUserId(savedUser.id);
        res.cookie(constants_1.REFRESH_TOKEN_COOKIE_KEY, refreshToken, constants_1.REFRESH_TOKEN_COOKIE_OPTION);
        return res.redirect(process.env.FRONTEND_URL);
    }
};
__decorate([
    (0, express_1.Get)('/refresh', [passport_2.refreshTokenGuard]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAccessToken", null);
__decorate([
    (0, express_1.Get)('/valid', [passport_2.accessTokenGuard]),
    __param(0, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkAccessTokenIsValid", null);
__decorate([
    (0, express_1.Get)('/user', [passport_2.accessTokenGuard]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, express_1.Get)('/google', [
        passport_1.default.authenticate('google', { scope: ['email', 'profile'] }),
    ]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, express_1.Get)('/google/callback', [
        passport_1.default.authenticate('google', { failureRedirect: '/auth/google' }),
    ]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleRedirect", null);
AuthController = __decorate([
    (0, express_1.Controller)('/auth'),
    (0, di_1.Injectable)(),
    __metadata("design:paramtypes", [auth_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map