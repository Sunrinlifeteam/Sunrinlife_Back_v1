import { DateTime } from 'luxon';
import { Attachment, IAttachment } from './attachment';
import { AttachmentRecord as AttachmentRecord } from '../entities/Attachment';
import { MyScheduleRecord } from '../entities/MySchedule';
import { getConnection } from 'typeorm';

export interface IMyScheduleBody {
    date: string;
    title: string;
    body: string;
    attachment: Array<string>;
}

export interface IMySchedule {
    date: Date;
    title: string;
    body: string;
    attachment: Array<IAttachment>;
}

export class MySchedule implements IMySchedule {
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

    toObject(): IMySchedule {
        return {
            date: this.date,
            title: this.title,
            body: this.body,
            attachment: this.attachment,
        };
    }
    toJSON(): any {
        return this.toObject();
        //return JSON.stringify(this.toObject());
    }
    async toActiveRecord(): Promise<MyScheduleRecord> {
        let record = new MyScheduleRecord();
        record.date = DateTime.fromJSDate(this.date).toFormat('yyyy-MM-dd');
        record.title = this.title;
        record.body = this.body;
        record.attachment = await Promise.all(
            this.attachment.map((x) =>
                Attachment.fromObject(x).toActiveRecord()
            )
        );
        return await getConnection().manager.save(record);
    }

    static fromActiveRecord(record: MyScheduleRecord): MySchedule {
        return MySchedule.fromObject({
            date: new Date(record.date),
            title: record.title,
            body: record.body,
            attachment: (record.attachment || []).map((x) =>
                Attachment.fromActiveRecord(x)
            ),
        });
    }
    static async fromBody(data: IMyScheduleBody): Promise<MySchedule> {
        return MySchedule.fromObject({
            date: new Date(data.date),
            title: data.title,
            body: data.body,
            attachment: (
                await getConnection().manager.findByIds(
                    AttachmentRecord,
                    data.attachment
                )
            ).map((x) => Attachment.fromActiveRecord(x)),
        });
    }
    static fromObject(data: IMySchedule): MySchedule {
        return new MySchedule(
            data.date,
            data.title,
            data.body,
            data.attachment
        );
    }
    static fromJSON(data: string): MySchedule {
        let object = JSON.parse(data);
        return MySchedule.fromObject({
            date: new Date(object['date'].toString()),
            title: object['title'].toString(),
            body: object['body'].toString(),
            attachment: object['attachment'].map((x: IAttachment) =>
                Attachment.fromObject(x)
            ),
        });
    }
}
