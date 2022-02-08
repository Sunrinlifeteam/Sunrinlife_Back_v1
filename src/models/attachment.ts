import { Attachment as AttachmentRecord } from '../entities/Attachment';

export interface IAttachment {
    filename: string; // ex) test.jpg
    path: string;
    mimetype: string; // ex) image/jpeg (more info: https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
}

export class Attachment implements IAttachment {
    filename: string;
    path: string;
    mimetype: string;
    constructor(filename: string, path: string, mimetype: string) {
        this.filename = filename;
        this.path = path;
        this.mimetype = mimetype;
    }

    toObject(): IAttachment {
        return {
            filename: this.filename,
            path: this.path,
            mimetype: this.mimetype,
        };
    }
    toJSON(): string {
        return JSON.stringify({
            filename: this.filename,
            path: this.path,
            mimetype: this.mimetype,
        });
    }

    async toActiveRecord(): Promise<AttachmentRecord> {
        let record = new AttachmentRecord();
        record.filename = this.filename;
        record.mimetype = this.mimetype;
        return await record.save();
    }
    static fromActiveRecord(record: AttachmentRecord): Attachment {
        return Attachment.fromObject({
            filename: record.filename,
            path: record.path,
            mimetype: record.mimetype,
        });
    }

    static fromObject(data: IAttachment) {
        return new Attachment(data.filename, data.path, data.mimetype);
    }
    static fromJSON(data: string): Attachment {
        let object = JSON.parse(data);
        return Attachment.fromObject({
            filename: object['filename'],
            path: object['path'],
            mimetype: object['mimetype'],
        });
    }
}
