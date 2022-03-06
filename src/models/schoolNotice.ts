import { Attachment, IAttachment } from '../models/attachment';
import { SchoolNoticeData } from '../entities/SchoolNotice';
import { AttachmentRecord as AttachmentRecord } from '../entities/Attachment';
import { getConnection } from 'typeorm';

export interface ISchoolNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    attachment: Array<IAttachment>;
}

export interface INoticeBody {
    title: string;
    content: string;
    created: Date;
    attachment: Array<IAttachment>;
}

export interface INoticeBodyWithID {
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

    async toActiveRecord(): Promise<SchoolNoticeData> {
        let record = new SchoolNoticeData();
        record.id = +this.id;
        record.created = new Date(this.created);
        record.title = this.title;
        record.content = this.content;
        record.attachment = await Promise.all(
            this.attachment.map((x) =>
                Attachment.fromObject(x).toActiveRecord()
            )
        );
        return await getConnection().manager.save(record);
    }

    static fromActiveRecord(record: SchoolNoticeData): SchoolNotice {
        return SchoolNotice.fromObject({
            id: +record.id,
            created: new Date(record.created),
            title: record.title,
            content: record.content,
            attachment: (record.attachment || []).map((x) =>
                Attachment.fromActiveRecord(x)
            ),
        });
    }

    static async fromBody(data: INoticeBodyWithID): Promise<SchoolNotice> {
        return SchoolNotice.fromObject({
            id: +data.id,
            created: new Date(data.created),
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
