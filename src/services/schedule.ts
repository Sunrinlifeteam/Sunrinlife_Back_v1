import { Injectable } from '@decorators/di';
import { Attachment, IAttachment } from '../types/attachment';

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

@Injectable()
export class ScheduleService {
    constructor() {}

    list(): { date: string; body: Schedule[] }[] {
        // TODO
        return [];
    }

    today(): Schedule[] {
        // TODO
        return [];
    }
}
