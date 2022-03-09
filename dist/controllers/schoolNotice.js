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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolNoticeController = void 0;
const express_1 = require("@decorators/express");
const celebrate_1 = require("celebrate");
const di_1 = require("@decorators/di");
const schoolNotice_1 = require("../services/schoolNotice");
const schoolNotice_2 = require("../validators/schoolNotice");
const entities_1 = require("../entities");
let SchoolNoticeController = class SchoolNoticeController {
    // eslint-disable-next-line no-unused-vars
    constructor(schoolNoticeService) {
        this.schoolNoticeService = schoolNoticeService;
    }
    list(res) {
        const result = this.schoolNoticeService.list();
        return res.status(200).json(result);
    }
    get(req, res) {
        const result = this.schoolNoticeService.get(parseInt(req.params.id));
        return res.status(200).json(result);
    }
    remove(req, res) {
        const result = this.schoolNoticeService.remove(parseInt(req.params.id));
        return res.status(200).json(result);
    }
    edit(req, res, body) {
        const result = this.schoolNoticeService.edit(Object.assign({ id: parseInt(req.params.id) }, body));
        return res.status(200).json(result);
    }
    add(res, body) {
        const result = this.schoolNoticeService.add(body);
        return res.status(200).json(result);
    }
};
__decorate([
    (0, express_1.Get)('/list'),
    __param(0, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SchoolNoticeController.prototype, "list", null);
__decorate([
    (0, express_1.Get)('/:id'),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SchoolNoticeController.prototype, "get", null);
__decorate([
    (0, express_1.Delete)('/:id'),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SchoolNoticeController.prototype, "remove", null);
__decorate([
    (0, express_1.Put)('/:id', [(0, celebrate_1.celebrate)(schoolNotice_2.schoolNoticeValidator)]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __param(2, (0, express_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], SchoolNoticeController.prototype, "edit", null);
__decorate([
    (0, express_1.Post)('/', [(0, celebrate_1.celebrate)(schoolNotice_2.schoolNoticeValidator)]),
    __param(0, (0, express_1.Response)()),
    __param(1, (0, express_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, entities_1.SchoolNoticeEntity]),
    __metadata("design:returntype", void 0)
], SchoolNoticeController.prototype, "add", null);
SchoolNoticeController = __decorate([
    (0, express_1.Controller)('/notice/school'),
    (0, di_1.Injectable)(),
    __metadata("design:paramtypes", [schoolNotice_1.SchoolNoticeService])
], SchoolNoticeController);
exports.SchoolNoticeController = SchoolNoticeController;
//# sourceMappingURL=schoolNotice.js.map