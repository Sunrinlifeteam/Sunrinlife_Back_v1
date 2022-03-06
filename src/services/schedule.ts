import { Inject, Injectable } from '@decorators/di';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/Schedule';
import logger from '../modules/logger';
import { Month, Week } from '../modules/typeorm';
import { DateTimeBody } from '../types/datetime';

@Injectable()
export class ScheduleService {
    constructor(
        @Inject(Schedule)
        private readonly scheduleRepository: Repository<Schedule>
    ) {}

    async getByMonth(date: DateTimeBody) {
        logger.debug(
            'ScheduleService.getByMonth',
            'date: ',
            DateTime.fromObject(date).toString()
        );
        return await this.scheduleRepository.find({
            where: {
                date: Month(date.toDateTime()),
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
                date: Week(date.toDateTime()),
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
                date: date.toDateTime(),
            },
        });
    }
}
