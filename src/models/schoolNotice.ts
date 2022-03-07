import { SchoolNoticeEntity } from '../entities/SchoolNotice';
import { AttachmentEntity } from '../entities/Attachment';
import { getConnection } from 'typeorm';

export interface ISchoolNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    attachment: AttachmentEntity[];
}

export interface INoticeBody {
    title: string;
    content: string;
    created: Date;
    attachment: AttachmentEntity[];
}

export interface INoticeBodyWithID {
    id: number;
    title: string;
    content: string;
    created: Date;
    attachment: AttachmentEntity[];
}

export class SchoolNotice implements ISchoolNotice {
    id: number;
    title: string;
    content: string;
    created: Date;
    attachment: AttachmentEntity[];

    constructor(
        id: number,
        title: string,
        content: string,
        created: Date,
        attachment: AttachmentEntity[]
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

    async toActiveRecord(): Promise<SchoolNoticeEntity> {
        let record = new SchoolNoticeEntity();
        record.id = +this.id;
        record.created = new Date(this.created);
        record.title = this.title;
        record.content = this.content;
        record.attachment = await Promise.all(
            [] /*
            this.attachment.map((x) =>
                Attachment.fromObject(x).toActiveRecord()
            ) */
        );
        return await getConnection().manager.save(record);
    }

    static fromActiveRecord(record: SchoolNoticeEntity): SchoolNotice {
        return SchoolNotice.fromObject({
            id: +record.id,
            created: new Date(record.created),
            title: record.title,
            content: record.content,
            attachment: [] /* (record.attachment || []).map((x) =>
                Attachment.fromActiveRecord(x)
            )*/,
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
                    AttachmentEntity,
                    data.attachment
                )
            ).map((x) => x /* Attachment.fromActiveRecord(x) */),
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
            attachment: [] /* object['attachment'].map((x: Att) =>
                Attachment.fromObject(x)
            )*/,
        });
    }
}
