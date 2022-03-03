import { Injectable } from '@decorators/di';
import { IMyScheduleBody, MySchedule } from '../models/mySchedule';
import { MyScheduleRecord } from '../entities/MySchedule';
import logger from '../modules/logger';
import { DateTime } from 'luxon';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class MyScheduleService {
    constructor() {}

    async list(user: User): Promise<MySchedule[]> {
        let find = await MyScheduleRecord.findByDates(
            user,
            DateTime.now(),
            DateTime.now().plus({ days: 7 })
        );
        logger.debug('services.mySchedule.list', find);
        return (find || []).map((x) => MySchedule.fromActiveRecord(x));
    }

    async write(body: IMyScheduleBody): Promise<any> {
        let object = await MySchedule.fromBody(body);
        let record = await object.toActiveRecord();
        await getConnection().manager.save(record);
        logger.debug('services.mySchedule.write', record);
        return { isError: false, id: record.id, data: object };
    }
}
