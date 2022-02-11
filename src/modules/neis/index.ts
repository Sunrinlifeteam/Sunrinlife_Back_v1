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

export const DefaultParameterSchema = Joi.object({
    KEY: Joi.string(),
    Type: Joi.string().valid('xml', 'json').default('json'),
    pIndex: Joi.number().default(1),
    pSize: Joi.number().default(100),
});

export default axios.create({
    baseURL: 'https://open.neis.go.kr/hub/',
});

//export { default as SchoolSchedule } from './SchoolSchedule';
export * from './SchoolSchedule';
