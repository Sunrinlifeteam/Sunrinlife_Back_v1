/* eslint-disable prettier/prettier */
import { SchoolSchedule } from '../../src/modules/neis';

test.each([['B10', '7010536', []]])(
    '',
    async (ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE) => {
        new SchoolSchedule().fetchJSON(
            {
                KEY: process.env.NEIS_API_KEY,
            },
            {
                ATPT_OFCDC_SC_CODE,
                SD_SCHUL_CODE,
            }
        );
    }
);
