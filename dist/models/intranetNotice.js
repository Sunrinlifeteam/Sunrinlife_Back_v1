"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntranetNotice = void 0;
const IntranetNotice_1 = require("../entities/IntranetNotice");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
class IntranetNotice {
    constructor(id, title, content, created, updated, attachment) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.created = created;
        this.updated = updated;
        this.attachment = attachment;
    }
    toObject() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            created: this.created,
            updated: this.updated,
            attachment: this.attachment,
        };
    }
    toJSON() {
        return JSON.stringify(this.toObject());
    }
    async toActiveRecord() {
        let record = new IntranetNotice_1.IntranetNoticeEntity();
        record.id = +this.id;
        record.created = new Date(this.created);
        record.updated = new Date(this.updated);
        record.title = this.title;
        record.content = this.content;
        record.attachment = await Promise.all([] /*
        this.attachment.map((x) =>
            Attachment.fromObject(x).toActiveRecord()
        )*/);
        return await (0, typeorm_1.getConnection)().manager.save(record);
    }
    static fromActiveRecord(record) {
        return IntranetNotice.fromObject({
            id: +record.id,
            created: new Date(record.created),
            updated: new Date(record.updated),
            title: record.title,
            content: record.content,
            attachment: [] /*(record.attachment || []).map((x) =>
                Attachment.fromActiveRecord(x)
            )*/,
        });
    }
    static async fromBody(data) {
        return IntranetNotice.fromObject({
            id: +data.id,
            created: new Date(data.created),
            updated: new Date(data.updated),
            title: data.title,
            content: data.content,
            attachment: (await (0, typeorm_1.getConnection)().manager.findByIds(entities_1.AttachmentEntity, data.attachment)).map((x) => x /*Attachment.fromActiveRecord(x)*/),
        });
    }
    static fromObject(data) {
        return new IntranetNotice(data.id, data.title, data.content, data.created, data.updated, data.attachment);
    }
    static fromJSON(data) {
        let object = JSON.parse(data);
        return IntranetNotice.fromObject({
            id: +object['id'],
            title: object['title'].toString(),
            content: object['content'].toString(),
            created: new Date(object['created'].toString()),
            updated: new Date(object['updated'].toString()),
            attachment: [] /*object['attachment'].map((x: AttachmentEntity) =>
                Attachment.fromObject(x)
            )*/,
        });
    }
}
exports.IntranetNotice = IntranetNotice;
//# sourceMappingURL=intranetNotice.js.map