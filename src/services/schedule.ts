import { Injectable } from '@decorators/di';
import { IScheduleBody, Schedule } from '../models/schedule';
import { Schedule as ScheduleRecord } from '../entities/Schedule';
import logger from '../modules/logger';
import { DateTime } from 'luxon';

@Injectable()
export class ScheduleService {
    constructor() {}

    async list(): Promise<Schedule[]> {
        let find = await ScheduleRecord.findByDates(
            DateTime.now(),
            DateTime.now().plus({ days: 7 })
        );
        logger.debug('services.schedule.list', find);
        return (find || []).map((x) => Schedule.fromActiveRecord(x));
    }

    async today(): Promise<Schedule | undefined> {
        let find = await ScheduleRecord.findByDate(new Date());
        if (find == undefined) return undefined;
        logger.debug('services.schedule.today', find);
        return Schedule.fromActiveRecord(find);
    }

    async write(body: IScheduleBody): Promise<any> {
        let object = await Schedule.fromBody(body);
        let record = await object.toActiveRecord();
        await record.save();
        logger.debug('services.schedule.write', record);
        return { isError: false, id: record.id, data: object };
    }
}
