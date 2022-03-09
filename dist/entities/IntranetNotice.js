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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntranetNoticeEntity = void 0;
const di_1 = require("@decorators/di");
const typeorm_1 = require("typeorm");
const Attachment_1 = require("./Attachment");
let IntranetNoticeEntity = class IntranetNoticeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IntranetNoticeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], IntranetNoticeEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], IntranetNoticeEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IntranetNoticeEntity.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], IntranetNoticeEntity.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Attachment_1.AttachmentEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], IntranetNoticeEntity.prototype, "attachment", void 0);
IntranetNoticeEntity = __decorate([
    (0, typeorm_1.Entity)('interaction_notice'),
    (0, di_1.Injectable)()
], IntranetNoticeEntity);
exports.IntranetNoticeEntity = IntranetNoticeEntity;
//# sourceMappingURL=IntranetNotice.js.map