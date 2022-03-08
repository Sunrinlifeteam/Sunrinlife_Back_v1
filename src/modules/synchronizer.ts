import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { Container } from '@decorators/di';
import {
    DefaultParameterPreset,
    SchoolParameterPreset,
} from '../constants/neis';
import { ScheduleEntity } from '../entities/Schedule';
import logger from './logger';
import { SchoolSchedule } from './neis';

export class NeisOpenAPI {
    static readonly parser = new SchoolSchedule();
    static async SchoolSchedule(start: DateTime, end: DateTime) {
        const scheduleRepository =
            Container.get<Repository<ScheduleEntity>>(ScheduleEntity);
        const result = await this.parser.fetchByMonthRange(
            DefaultParameterPreset,
            {
                SD_SCHUL_CODE: '',
                ...SchoolParameterPreset,
            },
            start,
            end
        );
        const old_records = await scheduleRepository.find();
        const records = [];
        for (let row of result.SchoolSchedule[1].row) {
            let obj = new ScheduleEntity();
            obj.date = row.AA_YMD.replace(
                /([0-9]{4})([0-9]{2})([0-9]{2})/,
                '$1-$2-$3'
            );
            obj.type = row.SBTR_DD_SC_NM;
            if (row.SBTR_DD_SC_NM == '') obj.type = '해당없음';
            obj.name = row.EVENT_NM;
            obj.content = row.EVENT_CNTNT;
            obj.grade = [];
            if (row.ONE_GRADE_EVENT_YN == 'Y') obj.grade.push(1);
            if (row.TW_GRADE_EVENT_YN == 'Y') obj.grade.push(2);
            if (row.THREE_GRADE_EVENT_YN == 'Y') obj.grade.push(3);
            if (row.FR_GRADE_EVENT_YN == 'Y') obj.grade.push(4);
            if (row.FIV_GRADE_EVENT_YN == 'Y') obj.grade.push(5);
            if (row.SIX_GRADE_EVENT_YN == 'Y') obj.grade.push(6);
            records.push(obj);
        }
        logger.debug(
            'synchronizer.NeisOpenAPI.SchoolSchedule',
            'Schedule Loaded: ',
            records.length
        );
        scheduleRepository.save(records);
        scheduleRepository.remove(old_records);
        return result;
    }
}
