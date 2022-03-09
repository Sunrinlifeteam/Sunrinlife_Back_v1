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
exports.UserScheduleController = void 0;
const express_1 = require("@decorators/express");
const di_1 = require("@decorators/di");
const userSchedule_1 = require("../services/userSchedule");
const logger_1 = __importDefault(require("../modules/logger"));
const mySchedule_1 = require("../validators/mySchedule");
const celebrate_1 = require("celebrate");
const passport_1 = require("../modules/passport");
const ErrorHandler_1 = require("../modules/ErrorHandler");
let UserScheduleController = class UserScheduleController {
    constructor(service) {
        this.service = service;
        logger_1.default.log('UserScheduleController Attached!');
    }
    async week(req, res) {
        if (!req.user)
            return (0, ErrorHandler_1.ErrorHandler)(new TypeError('req.user is undefined'), res);
        const result = await this.service.week(res.locals.user);
        return res.status(200).json(result);
    }
    async write(req, res, body) {
        if (!req.user)
            return (0, ErrorHandler_1.ErrorHandler)(new TypeError('req.user is undefined'), res);
        const result = await this.service.write(req.user, body);
        return res.status(201).json(result);
    }
};
__decorate([
    (0, express_1.Get)('/', [passport_1.accessTokenGuard]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserScheduleController.prototype, "week", null);
__decorate([
    (0, express_1.Post)('/write', [passport_1.accessTokenGuard, (0, celebrate_1.celebrate)(mySchedule_1.writeValidator)]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __param(2, (0, express_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserScheduleController.prototype, "write", null);
UserScheduleController = __decorate([
    (0, express_1.Controller)('/me/schedule'),
    (0, di_1.Injectable)(),
    __metadata("design:paramtypes", [userSchedule_1.UserScheduleService])
], UserScheduleController);
exports.UserScheduleController = UserScheduleController;
//# sourceMappingURL=userSchedule.js.map