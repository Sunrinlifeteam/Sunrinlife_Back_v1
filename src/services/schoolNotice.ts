/* eslint-disable no-unused-vars */
import { Injectable } from '@decorators/di';
import { SchoolNotice } from '../models/schoolNotice';
import { SchoolNoticeData } from '../entities/SchoolNotice';
import { INoticeBodyWithID } from '../models/schoolNotice';
import logger from '../modules/logger';
import { getConnection } from 'typeorm';

@Injectable()
export class SchoolNoticeService {
    constructor() {}

    async list(): Promise<SchoolNotice[]> {
        let find = await SchoolNoticeData.list();
        logger.debug('services.IntranetNotice.list', find);
        return (find || []).map(x => SchoolNotice.fromActiveRecord(x));
    }

    async get(id: number): Promise<SchoolNotice | undefined> {
        let find = await SchoolNoticeData.findById(id);
        if (find == undefined) return undefined;
        logger.debug('services.IntranetNotice.get',find);
        return SchoolNotice.fromActiveRecord(find);
    }

    async add(body: INoticeBodyWithID): Promise<any> {
        let object = await SchoolNotice.fromBody(body);
        let record = await object.toActiveRecord();
        await getConnection().manager.save(record);
        logger.debug('services.IntranetNotice.add', record);
        return { isError: false, id: record.id, data: object };
    }

    async edit(data: INoticeBodyWithID): Promise<INoticeBodyWithID> {
        // TODO
        return {
            id: data.id,
            title: data.title,
            created: data.created,
            content: data.content,
            attachment: data.attachment,
        };
    }

    async remove(id: number): Promise<INoticeBodyWithID[]> {
        // TODO
        return [];
    }
}
