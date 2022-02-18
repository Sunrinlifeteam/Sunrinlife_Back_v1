import { SchoolSchedule } from '../../src/modules/neis';
import { DefaultParameterPreset } from '../../src/constants/neis';
import { DateTime } from 'luxon';
import { writeFileSync } from 'fs';

jest.setTimeout(10000);

test.each([['B10', '7010536', []]])(
    '',
    async (ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE) => {
        console.log(DateTime.now().minus({ months: 1 }).toString());
        console.log(DateTime.now().plus({ months: 1 }).toString());
        const result = await new SchoolSchedule().fetchByMonthRange(
            DefaultParameterPreset,
            {
                ATPT_OFCDC_SC_CODE,
                SD_SCHUL_CODE,
            },
            DateTime.now().minus({ months: 1 }),
            DateTime.now().plus({ months: 1 })
        );
        writeFileSync('./data.json', JSON.stringify(result));
    }
);
