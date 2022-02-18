import { DateTime } from 'luxon';
import { getConnection } from 'typeorm';
import { ScheduleRecord } from '../entities/Schedule';

export interface IDateBody {
    year: number;
    month: number;
    day: number;
}

export interface ISchedule {
    date: DateTime;
    type: string;
    name: string;
    content: string;
    grade: number[];
}

export class Schedule implements ISchedule {
    id?: number;
    date: DateTime;
    type: string;
    name: string;
    content: string;
    grade: number[];

    constructor(
        date: DateTime,
        type: string,
        name: string,
        content: string,
        grade: number[],
        id?: number
    ) {
        this.date = date;
        this.type = type;
        this.name = name;
        this.content = content;
        this.grade = grade;
        this.id = id;
    }

    toObject(): ISchedule {
        return {
            date: this.date,
            type: this.type,
            name: this.name,
            content: this.content,
            grade: this.grade,
        };
    }
    toJSON(): any {
        return this.toObject();
        //return JSON.stringify(this.toObject());
    }
    async toActiveRecord(): Promise<ScheduleRecord> {
        let record = new ScheduleRecord();
        if (this.id) record.id = this.id;
        record.date = this.date.toFormat('yyyy-MM-dd');
        record.type = this.type;
        record.name = this.name;
        record.content = this.content;
        record.grade = this.grade;
        return await getConnection().manager.save(record);
    }

    static fromActiveRecord(record: ScheduleRecord): Schedule {
        return new Schedule(
            DateTime.fromFormat('yyyy-MM-dd', record.date),
            record.type,
            record.name,
            record.content,
            record.grade,
            record.id
        );
    }
    static fromObject(data: ISchedule): Schedule {
        return new Schedule(
            data.date,
            data.type,
            data.name,
            data.content,
            data.grade
        );
    }
    static fromJSON(data: string): Schedule {
        let object = JSON.parse(data);
        return Schedule.fromObject({
            date: DateTime.fromJSDate(new Date(object['date'].toString())),
            type: object['type'],
            name: object['name'],
            content: object['content'],
            grade: object['grade'],
        });
    }
}
