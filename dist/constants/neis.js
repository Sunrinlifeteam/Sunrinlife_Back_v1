"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolParameterPreset = exports.DefaultParameterPreset = void 0;
exports.DefaultParameterPreset = {
    KEY: process.env.NEIS_API_KEY,
    Type: 'json',
};
exports.SchoolParameterPreset = {
    ATPT_OFCDC_SC_CODE: process.env.ATPT_OFCDC_SC_CODE || '',
    SD_SCHUL_CODE: process.env.SD_SCHUL_CODE,
};
//# sourceMappingURL=neis.js.map