import { DateTime } from 'luxon';
import { Attachment, IAttachment } from '../models/attachment';
import { Attachment as AttachmentRecord } from '../entities/Attachment';
import { Schedule as ScheduleRecord } from '../entities/Schedule';

export interface IScheduleBody {
    date: string;
    title: string;
    body: string;
    attachment: Array<string>;
}

export interface ISchedule {
    date: Date;
    title: string;
    body: string;
    attachment: Array<IAttachment>;
}

export class Schedule implements ISchedule {
    date: Date;
    title: string;
    body: string;
    attachment: IAttachment[];

    constructor(
        date: Date,
        title: string,
        body: string,
        attachment: IAttachment[]
    ) {
        this.date = date;
        this.title = title;
        this.body = body;
        this.attachment = attachment;
    }

    toObject(): ISchedule {
        return {
            date: this.date,
            title: this.title,
            body: this.body,
            attachment: this.attachment,
        };
    }
    toJSON(): string {
        return JSON.stringify(this.toObject());
    }
    async toActiveRecord(): Promise<ScheduleRecord> {
        let record = new ScheduleRecord();
        record.date = DateTime.fromJSDate(this.date).toFormat('yyyy-MM-dd');
        record.title = this.title;
        record.body = this.body;
        record.attachment = await Promise.all(
            this.attachment.map((x) =>
                Attachment.fromObject(x).toActiveRecord()
            )
        );
        return await record.save();
    }

    static fromActiveRecord(record: ScheduleRecord): Schedule {
        return Schedule.fromObject({
            date: new Date(record.date),
            title: record.title,
            body: record.body,
            attachment: record.attachment.map((x) =>
                Attachment.fromActiveRecord(x)
            ),
        });
    }
    static async fromBody(data: IScheduleBody): Promise<Schedule> {
        return Schedule.fromObject({
            date: new Date(data.date),
            title: data.title,
            body: data.body,
            attachment: (await AttachmentRecord.findByIds(data.attachment)).map(
                (x) => Attachment.fromActiveRecord(x)
            ),
        });
    }
    static fromObject(data: ISchedule): Schedule {
        return new Schedule(data.date, data.title, data.body, data.attachment);
    }
    static fromJSON(data: string): Schedule {
        let object = JSON.parse(data);
        return Schedule.fromObject({
            date: new Date(object['date'].toString()),
            title: object['title'].toString(),
            body: object['body'].toString(),
            attachment: object['attachment'].map((x: string) =>
                Attachment.fromJSON(x)
            ),
        });
    }
}
