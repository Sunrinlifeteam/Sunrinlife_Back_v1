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

export interface ISchoolNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    attachment: Array<IAttachment>;
}

export class SchoolNotice implements ISchoolNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    attachment: IAttachment[];

    constructor(
        id: number,
        title: string,
        content: string,
        created: Date,
        attachment: IAttachment[]
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.created = created;
        this.attachment = attachment;
    }

    toObject(): ISchoolNotice {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            created: this.created,
            attachment: this.attachment,
        };
    }
    toJSON(): string {
        return JSON.stringify(this.toObject());
    }

    static fromObject(data: ISchoolNotice): SchoolNotice {
        return new SchoolNotice(
            data.id,
            data.title,
            data.content,
            data.created,
            data.attachment
        );
    }
    static fromJSON(data: string): SchoolNotice {
        let object = JSON.parse(data);
        return SchoolNotice.fromObject({
            id: +object['id'],
            title: object['title'].toString(),
            content: object['content'].toString(),
            created: new Date(object['created'].toString()),
            attachment: object['attachment'].map((x: IAttachment) =>
                Attachment.fromObject(x)
            ),
        });
    }
}

@Injectable()
export class SchoolNoticeService {
    constructor() {}
    
    list(): { id: number; title: string; created: Date; }[] {
        // TODO
        return [];
    }

    get(): SchoolNotice[] {
        // TODO
        return [];
    }

    add(): void {
        // TODO
    }
}