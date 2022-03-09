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
exports.ScheduleController = void 0;
const express_1 = require("@decorators/express");
const di_1 = require("@decorators/di");
const logger_1 = __importDefault(require("../modules/logger"));
const schedule_1 = require("../services/schedule");
const schedule_2 = require("../validators/schedule");
const celebrate_1 = require("celebrate");
const datetime_1 = require("../types/datetime");
let ScheduleController = class ScheduleController {
    // eslint-disable-next-line no-unused-vars
    constructor(service) {
        this.service = service;
        logger_1.default.log('ScheduleController Attached!');
    }
    async Get(res, body) {
        const result = await this.service.getByDay(body);
        return res.status(200).json(result);
    }
    async GetWeek(res, body) {
        const result = await this.service.getByWeek(body);
        return res.status(200).json(result);
    }
    async GetMonth(res, body) {
        const result = await this.service.getByMonth(body);
        return res.status(200).json(result);
    }
};
__decorate([
    (0, express_1.Get)('/', [(0, celebrate_1.celebrate)(schedule_2.DateValidator)]),
    __param(0, (0, express_1.Response)()),
    __param(1, (0, express_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, datetime_1.DateTimeBody]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "Get", null);
__decorate([
    (0, express_1.Get)('/week', [(0, celebrate_1.celebrate)(schedule_2.DateValidator)]),
    __param(0, (0, express_1.Response)()),
    __param(1, (0, express_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, datetime_1.DateTimeBody]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "GetWeek", null);
__decorate([
    (0, express_1.Get)('/month', [(0, celebrate_1.celebrate)(schedule_2.DateValidator)]),
    __param(0, (0, express_1.Response)()),
    __param(1, (0, express_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, datetime_1.DateTimeBody]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "GetMonth", null);
ScheduleController = __decorate([
    (0, express_1.Controller)('/schedule'),
    (0, di_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_1.ScheduleService])
], ScheduleController);
exports.ScheduleController = ScheduleController;
//# sourceMappingURL=schedule.js.map