import { Attachment, IAttachment } from './attachment';

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
