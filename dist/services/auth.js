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
exports.AuthService = void 0;
const di_1 = require("@decorators/di");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createAndGetUser(user) {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }
    async getUserByEmail(email) {
        return await this.userRepository.findOne({
            where: { email },
            select: User_1.USER_SELECT,
        });
    }
    createAccessTokenByUserId(id) {
        return jsonwebtoken_1.default.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d',
        });
    }
    async createAndGetRefreshTokenByUserId(id) {
        const refreshToken = jsonwebtoken_1.default.sign({ id }, process.env.REFRESH_TOKEN_SECRET);
        await this.userRepository.update(id, { refreshToken });
        return refreshToken;
    }
};
AuthService = __decorate([
    (0, di_1.Injectable)(),
    __param(0, (0, di_1.Inject)(User_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.js.map