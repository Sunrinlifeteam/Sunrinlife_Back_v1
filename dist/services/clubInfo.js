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
exports.ClubInfoService = void 0;
const di_1 = require("@decorators/di");
const typeorm_1 = require("typeorm");
const ClubInfo_1 = require("../entities/ClubInfo");
let ClubInfoService = class ClubInfoService {
    constructor(clubInfoRepository) {
        this.clubInfoRepository = clubInfoRepository;
    }
    async getAllClubs() {
        return await this.clubInfoRepository.find({
            select: ClubInfo_1.CLUB_SELECT,
        });
    }
    async getClubsByDepartment(department) {
        return await this.clubInfoRepository.find({
            where: { department },
            select: ClubInfo_1.CLUB_SELECT,
        });
    }
    async getClubsByType(type) {
        return await this.clubInfoRepository.find({
            where: { type },
            select: ClubInfo_1.CLUB_SELECT,
        });
    }
    async getClubsByDepartmentAndType(department, type) {
        return await this.clubInfoRepository.find({
            where: { department, type },
            select: ClubInfo_1.CLUB_SELECT,
        });
    }
    async createAndGetClub(club) {
        const newClub = this.clubInfoRepository.create(club);
        return await this.clubInfoRepository.save(newClub);
    }
};
ClubInfoService = __decorate([
    (0, di_1.Injectable)(),
    __param(0, (0, di_1.Inject)(ClubInfo_1.ClubInfoEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ClubInfoService);
exports.ClubInfoService = ClubInfoService;
//# sourceMappingURL=clubInfo.js.map