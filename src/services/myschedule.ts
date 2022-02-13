import { Injectable } from '@decorators/di';
import { IMyScheduleBody, MySchedule } from '../models/myschedule';
import { MyScheduleRecord } from '../entities/MySchedule';
import logger from '../modules/logger';
import { DateTime } from 'luxon';

@Injectable()
export class MyScheduleService {
    constructor() {}

    async list(): Promise<MySchedule[]> {
        let find = await MyScheduleRecord.findByDates(
            DateTime.now(),
            DateTime.now().plus({ days: 7 })
        );
        logger.debug('services.schedule.list', find);
        return (find || []).map((x) => MySchedule.fromActiveRecord(x));
    }

    async today(): Promise<MySchedule | undefined> {
        let find = await MyScheduleRecord.findByDate(new Date());
        if (find == undefined) return undefined;
        logger.debug('services.schedule.today', find);
        return MySchedule.fromActiveRecord(find);
    }

    async write(body: IMyScheduleBody): Promise<any> {
        let object = await MySchedule.fromBody(body);
        let record = await object.toActiveRecord();
        await record.save();
        logger.debug('services.schedule.write', record);
        return { isError: false, id: record.id, data: object };
    }
}
