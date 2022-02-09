import { Injectable } from '@decorators/di';
import { IUploadBody } from '../models/upload';
import { Attachment as AttachmentRecord } from '../entities/Attachment';
import { readFile, rename } from 'fs';
import path from 'path';
import { MD5, SHA1 } from '../modules/hash';
import { Attachment } from '../models/attachment';

@Injectable()
export class UploadService {
    constructor() {}

    async list() {
        const records = await AttachmentRecord.find();
        return (records || []).map((x) => Attachment.fromActiveRecord(x));
    }

    async info(id: number) {
        const record = await AttachmentRecord.findById(id);
        if (record == undefined) return undefined;
        return Attachment.fromActiveRecord(record);
    }

    async delete(id: number) {
        const record = await AttachmentRecord.findById(id);
        if (record == undefined) return undefined;
        record.remove();
        return Attachment.fromActiveRecord(record);
    }

    // eslint-disable-next-line no-undef
    async upload(file: Express.Multer.File, body: IUploadBody) {
        const UPLOAD_PATH = process.env.UPLOAD_PATH || './data';
        return new Promise((resolve, reject) =>
            readFile(path.resolve(process.cwd(), file.path), (err, data) => {
                if (err) return reject(err);
                rename(
                    file.path,
                    path.resolve(UPLOAD_PATH, SHA1(data)),
                    async (err) => {
                        if (err) return reject(err);
                        let obj = Attachment.fromObject({
                            filename: file.originalname,
                            path: UPLOAD_PATH,
                            mimetype: body.mimetype,
                            sha1hash: SHA1(data),
                            md5hash: MD5(data),
                        });
                        let record = await obj.toActiveRecord();
                        resolve({ id: record.id, ...obj.toObject() });
                    }
                );
            })
        );
    }
}
