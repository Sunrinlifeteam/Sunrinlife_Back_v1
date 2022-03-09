"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealService = exports.MealServiceParameterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = __importDefault(require("."));
const _2 = require(".");
exports.MealServiceParameterSchema = joi_1.default.object({
    ATPT_OFCDC_SC_CODE: joi_1.default.string().required(),
    SD_SCHUL_CODE: joi_1.default.string().required(),
    MMEAL_SC_CODE: joi_1.default.string(),
    MLSV_YMD: joi_1.default.string(),
    MLSV_FROM_YMD: joi_1.default.string(),
    MLSV_TO_YMD: joi_1.default.string(),
});
class MealService {
    constructor() { }
    /**
     * 학사일정
     * @param defParams 기본 인자
     * @param reqParams 신청 인자
     * @returns 출력값
     */
    async fetchJSON(defParams, reqParams) {
        defParams = await _2.DefaultParameterSchema.validateAsync(defParams);
        reqParams = await exports.MealServiceParameterSchema.validateAsync(reqParams);
        const paramString = new URLSearchParams({
            ...defParams,
            ...reqParams,
        }).toString();
        const url = `mealServiceDietInfo?${paramString}`;
        const res = await (0, _1.default)({
            method: 'GET',
            url: url,
        });
        return res.data;
    }
}
exports.MealService = MealService;
//# sourceMappingURL=MealService.js.map