"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolSchedule = exports.SchoolScheduleParameterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const index_1 = __importDefault(require("./index"));
const _1 = require(".");
const luxon_1 = require("luxon");
exports.SchoolScheduleParameterSchema = joi_1.default.object({
    ATPT_OFCDC_SC_CODE: joi_1.default.string().required(),
    SD_SCHUL_CODE: joi_1.default.string().required(),
    DGHT_CRSE_SC_NM: joi_1.default.string(),
    SCHUL_CRSE_SC_NM: joi_1.default.string(),
    AA_YMD: joi_1.default.string(),
    AA_FROM_YMD: joi_1.default.string(),
    AA_TO_YMD: joi_1.default.string(),
});
class SchoolSchedule {
    constructor() { }
    async fetchByMonth(defParams, reqParams, date) {
        if (date instanceof Date)
            date = luxon_1.DateTime.fromJSDate(date);
        reqParams.AA_YMD = date.toFormat('yyyyMM');
        return await this.fetchJSON(defParams, reqParams);
    }
    async fetchByMonthRange(defParams, reqParams, start, end) {
        if (start instanceof Date)
            start = luxon_1.DateTime.fromJSDate(start);
        if (end instanceof Date)
            end = luxon_1.DateTime.fromJSDate(end);
        reqParams.AA_FROM_YMD = start.toFormat('yyyyMM');
        reqParams.AA_TO_YMD = end.toFormat('yyyyMM');
        return await this.fetchJSON(defParams, reqParams);
    }
    /**
     * 학사일정
     * @param defParams 기본 인자
     * @param reqParams 신청 인자
     * @returns 출력값
     */
    async fetchJSON(defParams, reqParams) {
        defParams = await _1.DefaultParameterSchema.validateAsync(defParams);
        reqParams = await exports.SchoolScheduleParameterSchema.validateAsync(reqParams);
        const paramString = new URLSearchParams({
            ...defParams,
            ...reqParams,
        }).toString();
        const url = `SchoolSchedule?${paramString}`;
        const res = await (0, index_1.default)({
            method: 'GET',
            url: url,
        });
        return res.data;
    }
}
exports.SchoolSchedule = SchoolSchedule;
//# sourceMappingURL=SchoolSchedule.js.map