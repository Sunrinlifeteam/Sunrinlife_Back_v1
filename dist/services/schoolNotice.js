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
exports.SchoolNoticeService = void 0;
/* eslint-disable no-unused-vars */
const di_1 = require("@decorators/di");
const schoolNotice_1 = require("../models/schoolNotice");
const SchoolNotice_1 = require("../entities/SchoolNotice");
const logger_1 = __importDefault(require("../modules/logger"));
const typeorm_1 = require("typeorm");
let SchoolNoticeService = class SchoolNoticeService {
    constructor(schoolNoticeRepository) {
        this.schoolNoticeRepository = schoolNoticeRepository;
    }
    async list() {
        const schoolNotices = await this.schoolNoticeRepository.find();
        logger_1.default.debug('services.IntranetNotice.list', schoolNotices);
        // return (schoolNotices || []).map((x: any) => SchoolNotice.fromActiveRecord(x));
        return schoolNotices;
    }
    async get(id) {
        const schoolNotice = await this.schoolNoticeRepository.findOne({ id });
        if (!schoolNotice)
            return undefined;
        logger_1.default.debug('services.IntranetNotice.get', schoolNotice);
        return schoolNotice_1.SchoolNotice.fromActiveRecord(schoolNotice);
    }
    async add(body) {
        let object = await schoolNotice_1.SchoolNotice.fromBody(body);
        let record = await object.toActiveRecord();
        await (0, typeorm_1.getConnection)().manager.save(record);
        logger_1.default.debug('services.IntranetNotice.add', record);
        return { isError: false, id: record.id, data: object };
    }
    async edit(data) {
        // TODO
        return {
            id: data.id,
            title: data.title,
            created: data.created,
            content: data.content,
            attachment: data.attachment,
        };
    }
    async remove(id) {
        // TODO
        return [];
    }
};
SchoolNoticeService = __decorate([
    (0, di_1.Injectable)(),
    __param(0, (0, di_1.Inject)(SchoolNotice_1.SchoolNoticeEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SchoolNoticeService);
exports.SchoolNoticeService = SchoolNoticeService;
//# sourceMappingURL=schoolNotice.js.map