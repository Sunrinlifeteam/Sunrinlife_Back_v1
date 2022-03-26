import { Inject, Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { DeleteResult, Repository } from 'typeorm';
import { NoticeEntity } from '../entities/notice';
import { IWriteNoticeBody, INoticeListOption } from '../types/notice'

@Injectable()
export class NoticeService {
    constructor(
        @Inject(NoticeEntity)
        private readonly noticeServiceRepository: Repository<NoticeEntity>
    ) {}

    async list(option: INoticeListOption): Promise<NoticeEntity[]> {
        logger.debug(
            'called',
            'services/notice.ts/NoticeService.list',
            option
        );
        const { type, page, count, sort } = option
        const noticeList = await this.noticeServiceRepository.find({
            take:count,
            skip:page>=1 ? (page-1)*count : 0,
            where: {
                type: option.type!=='all' ? option.type : undefined  
            }
        });
        logger.debug('services.NoticeService.list', noticeList);
        return noticeList
    }

    async write(body: IWriteNoticeBody): Promise<NoticeEntity> {
        const newNotice = this.noticeServiceRepository.create({
            ...body,
        });
        return await this.noticeServiceRepository.save(newNotice);
    }

    async update(id: number, body: IWriteNoticeBody) {
        return await this.noticeServiceRepository.update(
            {
                id,
            },
            {
                ...body,
            }
        )
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.noticeServiceRepository.delete({
            id,
        });
    }
}