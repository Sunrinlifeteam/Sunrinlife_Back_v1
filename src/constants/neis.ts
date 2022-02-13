import { DefaultParameter, SchoolParameter } from '../modules/neis';

export const DefaultParameterPreset: DefaultParameter = {
    KEY: process.env.NEIS_API_KEY,
    Type: 'json',
};

export const SchoolParameterPreset: SchoolParameter = {
    ATPT_OFCDC_SC_CODE: process.env.ATPT_OFCDC_SC_CODE || '',
    SD_SCHUL_CODE: process.env.SD_SCHUL_CODE,
};
