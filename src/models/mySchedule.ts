import { DateTime } from 'luxon';
import { MyScheduleRecord } from '../entities/MySchedule';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export interface IMyScheduleBody {
    date: string;
    body: string;
}

export interface IMySchedule {
    date: Date;
    body: string;
}

export class MySchedule implements IMySchedule {
    date: Date;
    body: string;

    constructor(date: Date, body: string) {
        this.date = date;
        this.body = body;
    }

    toObject(): IMySchedule {
        return {
            date: this.date,
            body: this.body,
        };
    }
    toJSON(): any {
        return this.toObject();
        //return JSON.stringify(this.toObject());
    }
    async toActiveRecord(owner: User): Promise<MyScheduleRecord> {
        let record = new MyScheduleRecord();
        record.date = DateTime.fromJSDate(this.date).toFormat('yyyy-MM-dd');
        record.body = this.body;
        record.owner = owner;
        return await getConnection().manager.save(record);
    }

    static fromActiveRecord(record: MyScheduleRecord): MySchedule {
        return MySchedule.fromObject({
            date: new Date(record.date),
            body: record.body,
        });
    }
    static async fromBody(data: IMyScheduleBody): Promise<MySchedule> {
        return MySchedule.fromObject({
            date: new Date(data.date),
            body: data.body,
        });
    }
    static fromObject(data: IMySchedule): MySchedule {
        return new MySchedule(data.date, data.body);
    }
    static fromJSON(data: string): MySchedule {
        let object = JSON.parse(data);
        return MySchedule.fromObject({
            date: new Date(object['date'].toString()),
            body: object['body'].toString(),
        });
    }
}
