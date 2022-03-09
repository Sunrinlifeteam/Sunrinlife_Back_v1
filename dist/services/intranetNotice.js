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
exports.IntranetNoticeService = void 0;
const di_1 = require("@decorators/di");
const IntranetNotice_1 = require("../entities/IntranetNotice");
const intranetNotice_1 = require("../models/intranetNotice");
const logger_1 = __importDefault(require("../modules/logger"));
const typeorm_1 = require("typeorm");
let IntranetNoticeService = class IntranetNoticeService {
    constructor(intranetNoticeRepository) {
        this.intranetNoticeRepository = intranetNoticeRepository;
    }
    async list() {
        let intranetNotices = await this.intranetNoticeRepository.find();
        logger_1.default.debug('services.IntranetNotice.list', intranetNotices);
        // return (find || []).map((x) => IntranetNotice.fromActiveRecord(x));
        return intranetNotices;
    }
    async get(id) {
        let intranetNotice = await this.intranetNoticeRepository.findOne({
            id,
        });
        if (!intranetNotice)
            return undefined;
        logger_1.default.debug('services.IntranetNotice.get', intranetNotice);
        return intranetNotice_1.IntranetNotice.fromActiveRecord(intranetNotice);
    }
    async add(body) {
        let object = await intranetNotice_1.IntranetNotice.fromBody(body);
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
            updated: data.updated,
            content: data.content,
            attachment: data.attachment,
        };
    }
    async remove(id) {
        // TODO
        return [];
    }
};
IntranetNoticeService = __decorate([
    (0, di_1.Injectable)(),
    __param(0, (0, di_1.Inject)(IntranetNotice_1.IntranetNoticeEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], IntranetNoticeService);
exports.IntranetNoticeService = IntranetNoticeService;
//# sourceMappingURL=intranetNotice.js.map