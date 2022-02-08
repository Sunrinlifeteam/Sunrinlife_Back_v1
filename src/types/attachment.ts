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

    toObject(): IAttachment {
        return {
            filename: this.filename,
            data: this.data,
            mimetype: this.mimetype,
        };
    }
    toJSON(): string {
        return JSON.stringify({
            filename: this.filename,
            data: this.data.toString('base64'),
            mimetype: this.mimetype,
        });
    }

    static fromObject(data: IAttachment) {
        return new Attachment(data.filename, data.data, data.mimetype);
    }
    static fromJSON(data: string): Attachment {
        let object = JSON.parse(data);
        return Attachment.fromObject({
            filename: object['filename'],
            data: Buffer.from(object['data'], 'base64'),
            mimetype: object['mimetype'],
        });
    }
}
