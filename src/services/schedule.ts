import { Injectable } from '@decorators/di';

export interface IAttachment {
    filename: string; // ex) test.jpg
    data: Buffer;
    mimetype: string; // ex) image/jpeg (more info: https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
}

export class Attachment implements IAttachment {
    filename: string;
    data: Buffer;
    mimetype: string;
    constructor(filename: string, data: Buffer, mimetype: string) {
        this.filename = filename;
        this.data = data;
        this.mimetype = mimetype;
    }
    static fromObject(data: IAttachment) {
        return new Attachment(data.filename, data.data, data.mimetype);
    }
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

    static fromObject(data: ISchedule): Schedule {
        return new Schedule(data.date, data.title, data.body, data.attachment);
    }
    static fromJSON(data: string): Schedule {
        let object = JSON.parse(data);
        return Schedule.fromObject({
            date: new Date(object['date'].toString()),
            title: object['title'].toString(),
            body: object['body'].toString(),
            attachment: object['attachment'].map((x: IAttachment) =>
                Attachment.fromObject(x)
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
