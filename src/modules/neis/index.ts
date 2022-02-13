import axios from 'axios';
import { Joi } from 'celebrate';

export interface DefaultParameter {
    /**
     * 인증키
     */
    KEY?: string;
    /**
     * 호출 문서(xml, json)
     */
    Type?: 'xml' | 'json';
    /**
     * 페이지 위치
     */
    pIndex?: number;
    /**
     * 페이지 당 신청 숫자
     */
    pSize?: number;
}

export interface ReturnHead {
    head: [
        { list_total_count: string },
        { RESULT: { CODE: string; MESSAGE: string } }
    ];
}

export interface ReturnRow<T> {
    row: [T];
}

export interface SchoolParameter {
    /**
     * 시도교육청코드
     */
    ATPT_OFCDC_SC_CODE: string;
    /**
     * 표준학교코드
     */
    SD_SCHUL_CODE?: string;
}

export const DefaultParameterSchema = Joi.object({
    KEY: Joi.string(),
    Type: Joi.string().valid('xml', 'json').default('xml'),
    pIndex: Joi.number().default(1),
    pSize: Joi.number().default(100),
});

export default axios.create({
    baseURL: 'https://open.neis.go.kr/hub/',
});

//export { default as SchoolSchedule } from './SchoolSchedule';
export * from './SchoolSchedule';
