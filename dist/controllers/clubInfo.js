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
exports.ClubInfoController = void 0;
const express_1 = require("@decorators/express");
const di_1 = require("@decorators/di");
const clubInfo_1 = require("../services/clubInfo");
const logger_1 = __importDefault(require("../modules/logger"));
let ClubInfoController = class ClubInfoController {
    constructor(clubInfoService) {
        this.clubInfoService = clubInfoService;
        logger_1.default.log('ClubInfoController Attached!');
    }
    async getAllClubs(res) {
        const result = await this.clubInfoService.getAllClubs();
        return res.status(200).json(result);
    }
    async getClubsByDepartment(req, res) {
        const result = await this.clubInfoService.getClubsByDepartment(parseInt(req.params.dep));
        return res.status(200).json(result);
    }
    async getClubsByType(req, res) {
        const result = await this.clubInfoService.getClubsByType(parseInt(req.params.typ));
        return res.status(200).json(result);
    }
    async getClubsByDepartmentAndType(req, res) {
        const result = await this.clubInfoService.getClubsByDepartmentAndType(parseInt(req.params.dep), parseInt(req.params.typ));
        return res.status(200).json(result);
    }
};
__decorate([
    (0, express_1.Get)('/all'),
    __param(0, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClubInfoController.prototype, "getAllClubs", null);
__decorate([
    (0, express_1.Get)('/department/:dep'),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClubInfoController.prototype, "getClubsByDepartment", null);
__decorate([
    (0, express_1.Get)('/type/:typ'),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClubInfoController.prototype, "getClubsByType", null);
__decorate([
    (0, express_1.Get)('/department/:dep/type/:typ'),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClubInfoController.prototype, "getClubsByDepartmentAndType", null);
ClubInfoController = __decorate([
    (0, express_1.Controller)('/club'),
    (0, di_1.Injectable)(),
    __metadata("design:paramtypes", [clubInfo_1.ClubInfoService])
], ClubInfoController);
exports.ClubInfoController = ClubInfoController;
//# sourceMappingURL=clubInfo.js.map