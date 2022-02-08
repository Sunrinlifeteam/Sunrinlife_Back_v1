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

export interface IIntranetNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    updated: Date;
    attachment: Array<IAttachment>;
}

export class IntranetNotice implements IIntranetNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    updated: Date;
    attachment: IAttachment[];

    constructor(
        id: number,
        title: string,
        content: string,
        created: Date,
        updated: Date,
        attachment: IAttachment[]
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.created = created;
        this.updated = updated;
        this.attachment = attachment;
    }

    toObject(): IIntranetNotice {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            created: this.created,
            updated: this.updated,
            attachment: this.attachment,
        };
    }
    toJSON(): string {
        return JSON.stringify(this.toObject());
    }

    static fromObject(data: IIntranetNotice): IntranetNotice {
        return new IntranetNotice(
            data.id,
            data.title,
            data.content,
            data.created,
            data.updated,
            data.attachment
        );
    }
    static fromJSON(data: string): IntranetNotice {
        let object = JSON.parse(data);
        return IntranetNotice.fromObject({
            id: +object['id'],
            title: object['title'].toString(),
            content: object['content'].toString(),
            created: new Date(object['created'].toString()),
            updated: new Date(object['updated'].toString()),
            attachment: object['attachment'].map((x: IAttachment) =>
                Attachment.fromObject(x)
            ),
        });
    }
}

@Injectable()
export class IntranetNoticeService {
    constructor() {}
    
    list(): { id: number; title: string; created: Date; updated: Date; }[] {
        // TODO
        return [];
    }

    get( id: number ): IntranetNotice[] {
        // TODO
        return [];
    }

    add( data: { title: string; content: string; attachment: IAttachment[] } ): { id:number, title: string; content: string; attachment: IAttachment[] } {
        // TODO
        return {
            id:0,
            title:data.title,
            content:data.content,
            attachment:data.attachment
        };
    }

    edit( data: { id: number, title: string; content: string; attachment: IAttachment[] } ): { id:number, title: string; content: string; attachment: IAttachment[] } {
        // TODO
        return {
            id:data.id,
            title:data.title,
            content:data.content,
            attachment:data.attachment
        };
    }

    remove( id: number ): { id: number; title: string; content: string; }[] {
        // TODO
        return [];
    }
}