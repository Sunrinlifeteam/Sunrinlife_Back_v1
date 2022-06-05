import Joi from 'joi';
import api, { ReturnHead, ReturnRow, SchoolParameter } from './index';
import { DefaultParameter, DefaultParameterSchema } from '.';
import { DateTime } from 'luxon';

export interface SchoolScheduleParameter extends SchoolParameter {
    /**
     * 표준학교코드
     */
    SD_SCHUL_CODE: string;
    /**
     * 주야과정명
     */
    DGHT_CRSE_SC_NM?: string;
    /**
     * 학교과정명
     */
    SCHUL_CRSE_SC_NM?: string;
    /**
     * 학사일자
     */
    AA_YMD?: string;
    /**
     * 학사시작일자
     */
    AA_FROM_YMD?: string;
    /**
     * 학사종료일자
     */
    AA_TO_YMD?: string;
}

export const SchoolScheduleParameterSchema = Joi.object({
    ATPT_OFCDC_SC_CODE: Joi.string().required(),
    SD_SCHUL_CODE: Joi.string().required(),
    DGHT_CRSE_SC_NM: Joi.string(),
    SCHUL_CRSE_SC_NM: Joi.string(),
    AA_YMD: Joi.string(),
    AA_FROM_YMD: Joi.string(),
    AA_TO_YMD: Joi.string(),
});

export interface SchoolScheduleReturnItem {
    /**
     * 시도교육청코드
     */
    ATPT_OFCDC_SC_CODE: string;
    /**
     * 시도교육청명
     */
    ATPT_OFCDC_SC_NM: string;
    /**
     * 표준학교코드
     */
    SD_SCHUL_CODE: string;
    /**
     * 학교명
     */
    SCHUL_NM: string;
    /**
     * 학년도
     */
    AY: string;
    /**
     * 주야과정명
     */
    DGHT_CRSE_SC_NM: string;
    /**
     * 학교과정명
     */
    SCHUL_CRSE_SC_NM: string;
    /**
     * 수업공제일명
     */
    SBTR_DD_SC_NM: string;
    /**
     * 학사일자
     */
    AA_YMD: string;
    /**
     * 행사명
     */
    EVENT_NM: string;
    /**
     * 행사내용
     */
    EVENT_CNTNT: string;
    /**
     * 1학년행사여부
     */
    ONE_GRADE_EVENT_YN: string;
    /**
     * 2학년행사여부
     */
    TW_GRADE_EVENT_YN: string;
    /**
     * 3학년행사여부
     */
    THREE_GRADE_EVENT_YN: string;
    /**
     * 4학년행사여부
     */
    FR_GRADE_EVENT_YN: string;
    /**
     * 5학년행사여부
     */
    FIV_GRADE_EVENT_YN: string;
    /**
     * 6학년행사여부
     */
    SIX_GRADE_EVENT_YN: string;
    /**
     * 수정일
     */
    LOAD_DTM: string;
}

export interface SchoolScheduleReturnWrapper {
    SchoolSchedule: [ReturnHead, ReturnRow<SchoolScheduleReturnItem>];
}

export class SchoolSchedule {
    constructor() {}

    async fetchByMonth(
        defParams: DefaultParameter,
        reqParams: SchoolScheduleParameter,
        date: DateTime | Date
    ) {
        if (date instanceof Date) date = DateTime.fromJSDate(date);
        reqParams.AA_YMD = date.toFormat('yyyyMM');
        return await this.fetchJSON(defParams, reqParams);
    }

    async fetchByMonthFullRange(
        defParams: DefaultParameter,
        reqParams: SchoolScheduleParameter,
        start: DateTime | Date,
        end: DateTime | Date
    ) {
        if (start instanceof Date) start = DateTime.fromJSDate(start);
        if (end instanceof Date) end = DateTime.fromJSDate(end);
        reqParams.AA_FROM_YMD = start.startOf('month').toFormat('yyyyMMdd');
        reqParams.AA_TO_YMD = end.endOf('month').toFormat('yyyyMMdd');
        return await this.fetchJSON(defParams, reqParams);
    }

    async fetchByMonthRange(
        defParams: DefaultParameter,
        reqParams: SchoolScheduleParameter,
        start: DateTime | Date,
        end: DateTime | Date
    ) {
        if (start instanceof Date) start = DateTime.fromJSDate(start);
        if (end instanceof Date) end = DateTime.fromJSDate(end);
        reqParams.AA_FROM_YMD = start.toFormat('yyyyMM');
        reqParams.AA_TO_YMD = end.toFormat('yyyyMM');
        return await this.fetchJSON(defParams, reqParams);
    }

    async fetchByRange(
        defParams: DefaultParameter,
        reqParams: SchoolScheduleParameter,
        start: DateTime | Date,
        end: DateTime | Date
    ) {
        if (start instanceof Date) start = DateTime.fromJSDate(start);
        if (end instanceof Date) end = DateTime.fromJSDate(end);
        reqParams.AA_FROM_YMD = start.toFormat('yyyyMMdd');
        reqParams.AA_TO_YMD = end.toFormat('yyyyMMdd');
        return await this.fetchJSON(defParams, reqParams);
    }

    /**
     * 학사일정
     * @param defParams 기본 인자
     * @param reqParams 신청 인자
     * @returns 출력값
     */
    async fetchJSON(
        defParams: DefaultParameter,
        reqParams: SchoolScheduleParameter
    ): Promise<SchoolScheduleReturnWrapper> {
        defParams = await DefaultParameterSchema.validateAsync(defParams);
        reqParams = await SchoolScheduleParameterSchema.validateAsync(
            reqParams
        );
        const paramString = new URLSearchParams({
            ...defParams,
            ...reqParams,
        } as any).toString();
        const url = `SchoolSchedule?${paramString}`;
        const res = await api({
            method: 'GET',
            url: url,
        });
        return res.data;
    }
}
