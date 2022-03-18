import { Inject, Injectable } from '@decorators/di';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { ScheduleEntity } from '../entities/Schedule';
import logger from '../modules/logger';
import { Format, Month, Week } from '../modules/typeorm';
import { DateTimeBody } from '../types/datetime';

@Injectable()
export class ScheduleService {
    constructor(
        @Inject(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>
    ) {}

    async getByMonth(date: DateTimeBody) {
        logger.debug(
            'ScheduleService.getByMonth',
            'date: ',
            DateTime.fromObject(date).toString()
        );
        return await this.scheduleRepository.find({
            where: {
                date: Month(DateTime.fromObject(date)),
            },
        });
    }

    async getByWeek(date: DateTimeBody) {
        logger.debug(
            'ScheduleService.getByWeek',
            'date: ',
            DateTime.fromObject(date).toString()
        );
        return await this.scheduleRepository.find({
            where: {
                date: Week(DateTime.fromObject(date)),
            },
        });
    }

    async getByDay(date: DateTimeBody) {
        logger.debug(
            'ScheduleService.getByDay',
            'date: ',
            DateTime.fromObject(date).toString()
        );
        return await this.scheduleRepository.find({
            where: {
                date: Format(DateTime.fromObject(date)),
            },
        });
    }
}
