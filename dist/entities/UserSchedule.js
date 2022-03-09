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
exports.UserScheduleEntity = void 0;
const di_1 = require("@decorators/di");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserScheduleEntity = class UserScheduleEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserScheduleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", String)
], UserScheduleEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserScheduleEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.UserEntity, (user) => user.id),
    __metadata("design:type", User_1.UserEntity)
], UserScheduleEntity.prototype, "owner", void 0);
UserScheduleEntity = __decorate([
    (0, typeorm_1.Entity)('user_schedule'),
    (0, di_1.Injectable)()
], UserScheduleEntity);
exports.UserScheduleEntity = UserScheduleEntity;
//# sourceMappingURL=UserSchedule.js.map