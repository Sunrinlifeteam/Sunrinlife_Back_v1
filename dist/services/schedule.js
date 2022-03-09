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
exports.ScheduleService = void 0;
const di_1 = require("@decorators/di");
const luxon_1 = require("luxon");
const typeorm_1 = require("typeorm");
const Schedule_1 = require("../entities/Schedule");
const logger_1 = __importDefault(require("../modules/logger"));
const typeorm_2 = require("../modules/typeorm");
let ScheduleService = class ScheduleService {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async getByMonth(date) {
        logger_1.default.debug('ScheduleService.getByMonth', 'date: ', luxon_1.DateTime.fromObject(date).toString());
        return await this.scheduleRepository.find({
            where: {
                date: (0, typeorm_2.Month)(date.toDateTime()),
            },
        });
    }
    async getByWeek(date) {
        logger_1.default.debug('ScheduleService.getByWeek', 'date: ', luxon_1.DateTime.fromObject(date).toString());
        return await this.scheduleRepository.find({
            where: {
                date: (0, typeorm_2.Week)(date.toDateTime()),
            },
        });
    }
    async getByDay(date) {
        logger_1.default.debug('ScheduleService.getByDay', 'date: ', luxon_1.DateTime.fromObject(date).toString());
        return await this.scheduleRepository.find({
            where: {
                date: date.toDateTime(),
            },
        });
    }
};
ScheduleService = __decorate([
    (0, di_1.Injectable)(),
    __param(0, (0, di_1.Inject)(Schedule_1.ScheduleEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.js.map