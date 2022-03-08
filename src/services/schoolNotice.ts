/* eslint-disable no-unused-vars */
import { Inject, Injectable } from '@decorators/di';
import { SchoolNotice } from '../models/schoolNotice';
import { SchoolNoticeEntity } from '../entities/SchoolNotice';
import { INoticeBodyWithID } from '../models/schoolNotice';
import logger from '../modules/logger';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class SchoolNoticeService {
    constructor(
        @Inject(SchoolNoticeEntity)
        private readonly schoolNoticeRepository: Repository<SchoolNotice>
    ) {}

    async list(): Promise<SchoolNotice[]> {
        const schoolNotices = await this.schoolNoticeRepository.find();
        logger.debug('services.IntranetNotice.list', schoolNotices);
        // return (schoolNotices || []).map((x: any) => SchoolNotice.fromActiveRecord(x));
        return schoolNotices;
    }

    async get(id: number): Promise<SchoolNotice | undefined> {
        const schoolNotice = await this.schoolNoticeRepository.findOne({ id });
        if (!schoolNotice) return undefined;
        logger.debug('services.IntranetNotice.get', schoolNotice);
        return SchoolNotice.fromActiveRecord(schoolNotice);
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
