import { Inject, Injectable } from '@decorators/di';
import { IntranetNoticeEntity } from '../entities/IntranetNotice';
import { IntranetNotice, IIntranetNotice, IIntranetNoticePut } from '../models/intranetNotice';
import logger from '../modules/logger';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class IntranetNoticeService {
    constructor(
        @Inject(IntranetNoticeEntity)
        private readonly intranetNoticeRepository: Repository<IntranetNoticeEntity>
    ) {}

    async list(): Promise<IntranetNoticeEntity[]> {
        let intranetNotices = await this.intranetNoticeRepository.find();
        logger.debug('services.IntranetNotice.list', intranetNotices);
        // return (find || []).map((x) => IntranetNotice.fromActiveRecord(x));
        return intranetNotices;
    }

    async get(id: number): Promise<IntranetNoticeEntity | undefined> {
        let intranetNotice = await this.intranetNoticeRepository.findOne({
            id,
        });
        if (!intranetNotice) return undefined;
        logger.debug('services.IntranetNotice.get', intranetNotice);
        return IntranetNotice.fromActiveRecord(intranetNotice);
    }

    async add(body: IIntranetNotice): Promise<any> {
        let object = await IntranetNotice.fromBody(body);
        let record = await object.toActiveRecord();
        await getConnection().manager.save(record);
        logger.debug('services.IntranetNotice.add', record);
        return { isError: false, id: record.id, data: object };
    }

    async edit(data: { id: number; } & IIntranetNoticePut): Promise<IIntranetNotice> {
        // TODO
        let temp = {created:new Date()} // TEMP Code
        return {
            id: data.id,
            title: data.title,
            created: temp.created,
            content: data.content,
            attachment: data.attachment,
        };
    }

    async remove(id: number): Promise<IIntranetNotice[]> {
        // TODO
        return [];
    }
}
