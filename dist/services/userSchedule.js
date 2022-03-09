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
exports.UserScheduleService = void 0;
const di_1 = require("@decorators/di");
const UserSchedule_1 = require("../entities/UserSchedule");
const logger_1 = __importDefault(require("../modules/logger"));
const luxon_1 = require("luxon");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const typeorm_2 = require("../modules/typeorm");
let UserScheduleService = class UserScheduleService {
    constructor(userScheduleRepository, userRepository) {
        this.userScheduleRepository = userScheduleRepository;
        this.userRepository = userRepository;
    }
    async week(user) {
        logger_1.default.debug('called', 'services.mySchedule.list', user);
        const userSchedules = await this.userScheduleRepository.find({
            date: (0, typeorm_2.Week)(new luxon_1.DateTime()),
        });
        logger_1.default.debug('services.mySchedule.list', userSchedules);
        return userSchedules;
    }
    async write(userData, body) {
        const user = await this.userRepository.findOne(userData);
        const newSchedule = this.userScheduleRepository.create({
            ...body,
            owner: user,
            date: (0, typeorm_2.Today)(),
        });
        return await this.userScheduleRepository.save(newSchedule);
    }
};
UserScheduleService = __decorate([
    (0, di_1.Injectable)(),
    __param(0, (0, di_1.Inject)(UserSchedule_1.UserScheduleEntity)),
    __param(1, (0, di_1.Inject)(User_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UserScheduleService);
exports.UserScheduleService = UserScheduleService;
//# sourceMappingURL=userSchedule.js.map