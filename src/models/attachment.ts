import { Attachment as AttachmentRecord } from '../entities/Attachment';
import path from 'path';

export interface IAttachment {
    filename: string; // ex) test.jpg
    path: string;
    mimetype: string; // ex) image/jpeg (more info: https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
    sha1hash: string;
    md5hash: string;
}

export class Attachment implements IAttachment {
    filename: string;
    path: string;
    mimetype: string;
    sha1hash: string;
    md5hash: string;
    constructor(
        filename: string,
        path: string,
        sha1hash: string,
        md5hash: string,
        mimetype: string
    ) {
        this.filename = filename;
        this.path = path;
        this.sha1hash = sha1hash;
        this.md5hash = md5hash;
        this.mimetype = mimetype;
    }

    getPath(): string {
        return path.resolve(process.cwd(), this.path, this.sha1hash);
    }

    toObject(): IAttachment {
        return {
            filename: this.filename,
            path: this.path,
            mimetype: this.mimetype,
            sha1hash: this.sha1hash,
            md5hash: this.md5hash,
        };
    }
    toJSON(): any {
        return this.toObject();
    }

    async toActiveRecord(): Promise<AttachmentRecord> {
        let record = new AttachmentRecord();
        record.filename = this.filename;
        record.path = this.path;
        record.sha1hash = this.sha1hash;
        record.md5hash = this.md5hash;
        record.mimetype = this.mimetype;
        return await record.save();
    }
    static fromActiveRecord(record: AttachmentRecord): Attachment {
        return Attachment.fromObject({
            filename: record.filename,
            path: record.path,
            sha1hash: record.sha1hash,
            md5hash: record.md5hash,
            mimetype: record.mimetype,
        });
    }

    static fromObject(data: IAttachment) {
        return new Attachment(
            data.filename,
            data.path,
            data.sha1hash,
            data.md5hash,
            data.mimetype
        );
    }
    static fromJSON(data: string): Attachment {
        let object = JSON.parse(data);
        return Attachment.fromObject({
            filename: object['filename'],
            path: object['path'],
            sha1hash: object['sha1hash'],
            md5hash: object['md5hash'],
            mimetype: object['mimetype'],
        });
    }
}
