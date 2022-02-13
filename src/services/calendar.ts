import { Injectable } from '@decorators/di';
import { DateTime } from 'luxon';
import { CalendarRecord } from '../entities/Calendar';
import { IDateBody } from '../models/calendar';
import logger from '../modules/logger';

@Injectable()
export class CalendarService {
    constructor() {}

    // eslint-disable-next-line no-unused-vars
    async getByMonth(date: IDateBody) {
        logger.debug(DateTime.fromObject(date).toString());
        return await CalendarRecord.findByMonth(DateTime.fromObject(date));
    }
}
