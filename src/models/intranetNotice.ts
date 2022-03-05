import { IntranetNoticeData } from '../entities/IntranetNotice';
import { AttachmentRecord as AttachmentRecord } from '../entities/Attachment';
import { Attachment, IAttachment } from './attachment';
import { getConnection } from 'typeorm';

export interface IIntranetNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    updated: Date;
    attachment: Array<IAttachment>;
}

export interface INoticeBody {
    title: string;
    content: string;
    created: Date;
    updated: Date;
    attachment: Array<IAttachment>;
}

export interface INoticeBodyWithID {
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

    async toActiveRecord(): Promise<IntranetNoticeData> {
        let record = new IntranetNoticeData();
        record.id = +this.id;
        record.created = new Date(this.created);
        record.updated = new Date(this.updated);
        record.title = this.title;
        record.content = this.content;
        record.attachment = await Promise.all(
            this.attachment.map((x) =>
                Attachment.fromObject(x).toActiveRecord()
            )
        );
        return await getConnection().manager.save(record);
    }

    static fromActiveRecord(record: IntranetNoticeData): IntranetNotice {
        return IntranetNotice.fromObject({
            id: +record.id,
            created: new Date(record.created),
            updated: new Date(record.updated),
            title: record.title,
            content: record.content,
            attachment: (record.attachment || []).map((x) =>
                Attachment.fromActiveRecord(x)
            ),
        });
    }

    static async fromBody(data: INoticeBodyWithID): Promise<IntranetNotice> {
        return IntranetNotice.fromObject({
            id: +data.id,
            created: new Date(data.created),
            updated: new Date(data.updated),
            title: data.title,
            content: data.content,
            attachment: (
                await getConnection().manager.findByIds(
                    AttachmentRecord,
                    data.attachment
                )
            ).map((x) => Attachment.fromActiveRecord(x)),
        });
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
