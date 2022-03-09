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
exports.MealEntity = void 0;
const di_1 = require("@decorators/di");
const typeorm_1 = require("typeorm");
let MealEntity = class MealEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'date', nullable: false }),
    __metadata("design:type", String)
], MealEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], MealEntity.prototype, "mealType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], MealEntity.prototype, "meal", void 0);
MealEntity = __decorate([
    (0, typeorm_1.Entity)('meal'),
    (0, di_1.Injectable)()
], MealEntity);
exports.MealEntity = MealEntity;
//# sourceMappingURL=Meal.js.map