import { Injectable } from '@decorators/di';
import { IScheduleBody, Schedule } from '../models/schedule';
import { Schedule as ScheduleRecord } from '../entities/Schedule';

@Injectable()
export class ScheduleService {
    constructor() {}

    list(): { date: string; body: Schedule[] }[] {
        // TODO
        return [];
    }

    async today(): Promise<Schedule | undefined> {
        let find = await ScheduleRecord.findByDate(new Date());
        if (find == undefined) return undefined;
        return Schedule.fromActiveRecord(find);
    }

    async write(body: IScheduleBody): Promise<Schedule> {
        let object = await Schedule.fromBody(body);
        await (await object.toActiveRecord()).save();
        return object;
    }
}
