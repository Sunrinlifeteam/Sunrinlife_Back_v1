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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentEntity = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const User_1 = require("./User");
const di_1 = require("@decorators/di");
let AttachmentEntity = class AttachmentEntity {
    getPath() {
        return path_1.default.resolve(process.cwd(), this.path, this.sha1hash);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttachmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], AttachmentEntity.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], AttachmentEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], AttachmentEntity.prototype, "sha1hash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], AttachmentEntity.prototype, "md5hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], AttachmentEntity.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.UserEntity, (user) => user.id),
    __metadata("design:type", User_1.UserEntity)
], AttachmentEntity.prototype, "author", void 0);
AttachmentEntity = __decorate([
    (0, typeorm_1.Entity)('attachment'),
    (0, di_1.Injectable)()
], AttachmentEntity);
exports.AttachmentEntity = AttachmentEntity;
//# sourceMappingURL=Attachment.js.map