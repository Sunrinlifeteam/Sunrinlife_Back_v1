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
exports.UserEntity = exports.USER_SELECT = void 0;
const di_1 = require("@decorators/di");
const typeorm_1 = require("typeorm");
exports.USER_SELECT = [
    'id',
    'email',
    'username',
    'department',
    'grade',
    'class',
    'number',
    'accountType',
];
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true, length: 10 }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, unsigned: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, unsigned: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, unsigned: true }),
    __metadata("design:type", Number)
], UserEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, nullable: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "libraryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "teacherEmail", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user'),
    (0, di_1.Injectable)()
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=User.js.map