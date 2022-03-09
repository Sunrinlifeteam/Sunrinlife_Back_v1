"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolNotice = void 0;
const SchoolNotice_1 = require("../entities/SchoolNotice");
const Attachment_1 = require("../entities/Attachment");
const typeorm_1 = require("typeorm");
class SchoolNotice {
    constructor(id, title, content, created, attachment) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.created = created;
        this.attachment = attachment;
    }
    toObject() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            created: this.created,
            attachment: this.attachment,
        };
    }
    toJSON() {
        return JSON.stringify(this.toObject());
    }
    async toActiveRecord() {
        let record = new SchoolNotice_1.SchoolNoticeEntity();
        record.id = +this.id;
        record.created = new Date(this.created);
        record.title = this.title;
        record.content = this.content;
        record.attachment = await Promise.all([] /*
        this.attachment.map((x) =>
            Attachment.fromObject(x).toActiveRecord()
        ) */);
        return await (0, typeorm_1.getConnection)().manager.save(record);
    }
    static fromActiveRecord(record) {
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
    static async fromBody(data) {
        return SchoolNotice.fromObject({
            id: +data.id,
            created: new Date(data.created),
            title: data.title,
            content: data.content,
            attachment: (await (0, typeorm_1.getConnection)().manager.findByIds(Attachment_1.AttachmentEntity, data.attachment)).map((x) => x /* Attachment.fromActiveRecord(x) */),
        });
    }
    static fromObject(data) {
        return new SchoolNotice(data.id, data.title, data.content, data.created, data.attachment);
    }
    static fromJSON(data) {
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
exports.SchoolNotice = SchoolNotice;
//# sourceMappingURL=schoolNotice.js.map