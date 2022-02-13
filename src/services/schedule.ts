import { Injectable } from '@decorators/di';
import { DateTime } from 'luxon';
import { ScheduleRecord } from '../entities/Schedule';
import { IDateBody } from '../models/schedule';
import logger from '../modules/logger';

@Injectable()
export class ScheduleService {
    constructor() {}

    // eslint-disable-next-line no-unused-vars
    async getByMonth(date: IDateBody) {
        logger.debug(DateTime.fromObject(date).toString());
        return await ScheduleRecord.findByMonth(DateTime.fromObject(date));
    }
}
