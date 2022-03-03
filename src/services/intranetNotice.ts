import { Injectable } from '@decorators/di';
import { IntranetNoticeData } from '../entities/IntranetNotice';
import { IntranetNotice } from '../models/intranetNotice';
import { INoticeBody, INoticeBodyWithID } from '../models/intranetNotice';
import logger from '../modules/logger';
import { getConnection } from 'typeorm';

@Injectable()
export class IntranetNoticeService {
    constructor() {}

    async list(): Promise<IntranetNotice[]> {
        let find = await IntranetNoticeData.list();
        logger.debug('services.IntranetNotice.list', find);
        return (find || []).map(x => IntranetNotice.fromActiveRecord(x));
    }

    async get(id: number): Promise<IntranetNotice | undefined> {
        let find = await IntranetNoticeData.findById(id);
        if (find == undefined) return undefined;
        logger.debug('services.IntranetNotice.get',find);
        return IntranetNotice.fromActiveRecord(find);
    }

    async add(body: INoticeBodyWithID): Promise<any> {
        let object = await IntranetNotice.fromBody(body);
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
            updated: data.updated,
            content: data.content,
            attachment: data.attachment,
        };
    }

    async remove(id: number): Promise<INoticeBodyWithID[]> {
        // TODO
        return [];
    }
}
