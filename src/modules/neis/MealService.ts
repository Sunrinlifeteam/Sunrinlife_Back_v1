import Joi from 'joi';
import api, { ReturnHead, ReturnRow, SchoolParameter } from '.';
import { DefaultParameter, DefaultParameterSchema } from '.';

export interface MealServiceParameter extends SchoolParameter {
    /**
     * 표준학교코드
     */
    SD_SCHUL_CODE: string;
    /**
     * 식사코드
     */
    MMEAL_SC_CODE?: string;
    /**
     * 급식일자
     */
    MLSV_YMD?: string;
    /**
     * 급식시작일자
     */
    MLSV_FROM_YMD?: string;
    /**
     * 급식종료일자
     */
    MLSV_TO_YMD?: string;
}

export const MealServiceParameterSchema = Joi.object({
    ATPT_OFCDC_SC_CODE: Joi.string().required(),
    SD_SCHUL_CODE: Joi.string().required(),
    MMEAL_SC_CODE: Joi.string(),
    MLSV_YMD: Joi.string(),
    MLSV_FROM_YMD: Joi.string(),
    MLSV_TO_YMD: Joi.string(),
});

export interface MealServiceReturnItem {
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
     * 식사코드
     */
    MMEAL_SC_CODE: string;
    /**
     * 식사명
     */
    MMEAL_SC_NM: string;
    /**
     * 급식일자
     */
    MLSV_YMD: string;
    /**
     * 급식인원수
     */
    MLSV_FGR: string;
    /**
     * 요리명
     */
    DDISH_NM: string;
    /**
     * 원산지정보
     */
    ORPLC_INFO: string;
    /**
     * 칼로리정보
     */
    CAL_INFO: string;
    /**
     * 영양정보
     */
    NTR_INFO: string;
    /**
     * 급식시작일자
     */
    MLSV_FROM_YMD: string;
    /**
     * 급식종료일자
     */
    MLSV_TO_YMD: string;
}

export interface MealServiceReturnWrapper {
    mealServiceDietInfo: [ReturnHead, ReturnRow<MealServiceReturnItem>];
}

export class MealService {
    constructor() {}

    /**
     * 학사일정
     * @param defParams 기본 인자
     * @param reqParams 신청 인자
     * @returns 출력값
     */
    async fetchJSON(
        defParams: DefaultParameter,
        reqParams: MealServiceParameter
    ): Promise<MealServiceReturnWrapper> {
        defParams = await DefaultParameterSchema.validateAsync(defParams);
        reqParams = await MealServiceParameterSchema.validateAsync(reqParams);
        const paramString = new URLSearchParams({
            ...defParams,
            ...reqParams,
        } as any).toString();
        const url = `mealServiceDietInfo?${paramString}`;
        const res = await api({
            method: 'GET',
            url: url,
        });
        return res.data;
    }
}
