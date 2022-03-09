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
exports.UploadService = void 0;
const di_1 = require("@decorators/di");
const Attachment_1 = require("../entities/Attachment");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const hash_1 = require("../modules/hash");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
let UploadService = class UploadService {
    constructor(attachmentRepository, userRepository) {
        this.attachmentRepository = attachmentRepository;
        this.userRepository = userRepository;
    }
    async list(offset = 0, limit = 25) {
        const records = await this.attachmentRepository.find({
            order: {
                id: 'ASC',
            },
            skip: offset,
            take: limit,
        });
        return records;
    }
    async info(id) {
        const record = await this.attachmentRepository.findOne({ id });
        return record;
    }
    async delete(userData, id) {
        const user = await this.userRepository.findOne(userData);
        const record = await this.attachmentRepository.findOne({ id });
        if (record && user && (record === null || record === void 0 ? void 0 : record.author.id) == (user === null || user === void 0 ? void 0 : user.id))
            return await this.attachmentRepository.remove(record);
        return new Error();
    }
    async upload(userData, 
    // eslint-disable-next-line no-undef
    file, body) {
        const UPLOAD_PATH = process.env.UPLOAD_PATH || './data';
        return new Promise((resolve, reject) => (0, fs_1.readFile)(path_1.default.resolve(process.cwd(), file.path), (err, data) => {
            if (err)
                return reject(err);
            (0, fs_1.rename)(file.path, path_1.default.resolve(UPLOAD_PATH, (0, hash_1.SHA1)(data)), async (err) => {
                if (err)
                    return reject(err);
                let user = await this.userRepository.findOne(userData);
                if (!user)
                    return reject();
                let record = this.attachmentRepository.create();
                record.author = user;
                record.filename = file.originalname;
                record.path = UPLOAD_PATH;
                record.mimetype = body.mimetype;
                record.sha1hash = (0, hash_1.SHA1)(data);
                record.md5hash = (0, hash_1.MD5)(data);
                resolve(await this.attachmentRepository.save(record));
            });
        }));
    }
};
UploadService = __decorate([
    (0, di_1.Injectable)(),
    __param(0, (0, di_1.Inject)(Attachment_1.AttachmentEntity)),
    __param(1, (0, di_1.Inject)(User_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.js.map