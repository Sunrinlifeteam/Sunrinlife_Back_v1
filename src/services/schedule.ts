import { Injectable } from '@decorators/di';
import { DateTime } from 'luxon';
import { ScheduleRecord } from '../entities/Schedule';
import { IDateBody } from '../models/schedule';
import logger from '../modules/logger';

@Injectable()
export class ScheduleService {
    constructor() {}

    async getByMonth(date: IDateBody) {
        logger.debug(
            'ScheduleService.getByMonth',
            'date: ',
            DateTime.fromObject(date).toString()
        );
        return await ScheduleRecord.findByMonth(DateTime.fromObject(date));
    }

    async getByWeek(date: IDateBody) {
        logger.debug(
            'ScheduleService.getByWeek',
            'date: ',
            DateTime.fromObject(date).toString()
        );
        return await ScheduleRecord.findByDayRange(
            DateTime.fromObject(date),
            DateTime.fromObject(date).plus({ weeks: 1 })
        );
    }

    async getByDay(date: IDateBody) {
        logger.debug(
            'ScheduleService.getByDay',
            'date: ',
            DateTime.fromObject(date).toString()
        );
        return await ScheduleRecord.findByDay(DateTime.fromObject(date));
    }
}
