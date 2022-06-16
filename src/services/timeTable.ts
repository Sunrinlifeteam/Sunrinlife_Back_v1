import { Injectable, Inject } from '@decorators/di';
import { Repository } from 'typeorm';
import { TimeTableEntity, TIMETABLE_SELECT } from '../entities/TimeTable';
import { ITimeTableBody } from '../types/timeTable';
import HttpStatusCode from '../constants/HttpStatusCode';
import { update } from 'cheerio/lib/parse';
import { options } from 'joi';
import { WeekTimeTableEntity, WEEK_TIMETABLE_SELECT } from '../entities/WeekTimeTable';

@Injectable()
export class TimeTableService {
    constructor(
        @Inject(TimeTableEntity)
        private readonly timeTableRepository: Repository<TimeTableEntity>,
        @Inject(WeekTimeTableEntity)
        private readonly weekTimeTableRepository: Repository<WeekTimeTableEntity>
    ) {}

    async getTodayTimeTable() {
        const date = WEEK_TIMETABLE_SELECT[new Date().getDate()];
        return await this.weekTimeTableRepository.findOne({
            select: [date],
        });
    }


    async getCurrentTimeTable() {
        return await this.timeTableRepository.findOne({
            select: TIMETABLE_SELECT,
            where: { current: true },
        });
    }

    // Administrator only

    async getAllTimeTable() {
        return await this.timeTableRepository.find({});
    }

    async updateTimeTable(id: number, alias: string, timeJson: string) {
        const timeTable = await this.timeTableRepository.findOne({
            where: { id },
        });
        if (!timeTable) throw new Error('Not Found id');
        const result = await this.timeTableRepository.update(
            {
                id: id,
            },
            {
                alias: alias,
                timeJson: timeJson,
            }
        );
        return {
            status: HttpStatusCode.OK,
            data: result,
        };
    }

    async changeCurrent(id: number) {
        const oldCurrent = await this.timeTableRepository.update(
            {
                current: true,
            },
            {
                current: false,
            }
        );
        const newCurrent = await this.timeTableRepository.update(
            { id: id },
            { current: true }
        );
        return {
            status: HttpStatusCode.OK,
            data: newCurrent,
        };
    }

    async deleteTimeTable(id: number) {
        const remove = await this.timeTableRepository.delete({
            id: id,
        });
        return {
            status: HttpStatusCode.NO_CONTENT,
        };
    }
}
