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
exports.UploadController = void 0;
const express_1 = require("@decorators/express");
const di_1 = require("@decorators/di");
const logger_1 = __importDefault(require("../modules/logger"));
const upload_1 = require("../services/upload");
const upload_2 = __importDefault(require("../modules/upload"));
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const celebrate_1 = require("celebrate");
const upload_3 = require("../validators/upload");
const fs_1 = require("fs");
const passport_1 = require("../modules/passport");
const ErrorHandler_1 = require("../modules/ErrorHandler");
let UploadController = class UploadController {
    // eslint-disable-next-line no-unused-vars
    constructor(uploadService) {
        this.uploadService = uploadService;
        logger_1.default.log('UploadController Attached!');
    }
    LogError(functionName, errorMessage) {
        logger_1.default.error('Error on\n', '\tcontrollers.upload.ts\n', `\tUploadController.${functionName}\n`, errorMessage
            .split('\n')
            .map((x) => `-${x}`)
            .join('\n'));
    }
    async Get(res) {
        const result = await this.uploadService.list();
        return res.status(HttpStatusCode_1.default.OK).json(result);
    }
    async GetById(res, id) {
        const result = await this.uploadService.info(id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
        return res.status(HttpStatusCode_1.default.OK).json(result);
    }
    async DownloadById(res, id) {
        const result = await this.uploadService.info(id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
        return res.status(HttpStatusCode_1.default.OK).download(result.getPath());
    }
    async ViewById(res, id) {
        const result = await this.uploadService.info(id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
        res.status(HttpStatusCode_1.default.OK).header('Content-Type', result.mimetype);
        return (0, fs_1.createReadStream)(result.getPath()).pipe(res);
    }
    async DeleteById(req, res, id) {
        if (!req.user)
            return (0, ErrorHandler_1.ErrorHandler)(new TypeError('req.user is undefined'), res);
        const result = await this.uploadService.delete(req.user, id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
        return res.status(HttpStatusCode_1.default.NO_CONTENT);
    }
    async Post(req, res, body) {
        if (req.file == undefined)
            return res
                .status(HttpStatusCode_1.default.BAD_REQUEST)
                .json({ message: 'Need a file to upload' });
        if (!req.user)
            return (0, ErrorHandler_1.ErrorHandler)(new TypeError('req.user is undefined'), res);
        const result = await this.uploadService.upload(req.user, req.file, body);
        return res.status(HttpStatusCode_1.default.CREATED).json(result);
    }
};
__decorate([
    (0, express_1.Get)('/'),
    __param(0, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "Get", null);
__decorate([
    (0, express_1.Get)('/:id'),
    __param(0, (0, express_1.Response)()),
    __param(1, (0, express_1.Params)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "GetById", null);
__decorate([
    (0, express_1.Get)('/download/:id'),
    __param(0, (0, express_1.Response)()),
    __param(1, (0, express_1.Params)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "DownloadById", null);
__decorate([
    (0, express_1.Get)('/view/:id'),
    __param(0, (0, express_1.Response)()),
    __param(1, (0, express_1.Params)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "ViewById", null);
__decorate([
    (0, express_1.Delete)('/:id', [passport_1.accessTokenGuard]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __param(2, (0, express_1.Params)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "DeleteById", null);
__decorate([
    (0, express_1.Post)('/', [
        passport_1.accessTokenGuard,
        upload_2.default.single('file'),
        (0, celebrate_1.celebrate)(upload_3.uploadValidator),
    ]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __param(2, (0, express_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "Post", null);
UploadController = __decorate([
    (0, express_1.Controller)('/upload'),
    (0, di_1.Injectable)(),
    __metadata("design:paramtypes", [upload_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.js.map