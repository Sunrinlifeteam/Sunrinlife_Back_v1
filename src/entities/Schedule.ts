/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    getConnection,
} from 'typeorm';
import { DateTime } from 'luxon';
import logger from '../modules/logger';

@Entity('schedule')
export class ScheduleRecord extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    content: string;

    @Column('simple-array', { nullable: false })
    grade: number[];

    static async findByYear(date: DateTime) {
        logger.debug('ScheduleRecord.findByYear', 'date: ', date.toString());
        return await getConnection()
            .getRepository(ScheduleRecord)
            .createQueryBuilder('calendar')
            .where('calendar.date like :date', {
                date: date.toFormat('yyyy-__-__'),
            })
            .getMany();
    }

    static async findByMonth(date: DateTime) {
        logger.debug('ScheduleRecord.findByMonth', 'date: ', date.toString());
        return getConnection()
            .getRepository(ScheduleRecord)
            .createQueryBuilder('calendar')
            .where('calendar.date like :date', {
                date: date.toFormat('yyyy-MM-__'),
            })
            .getMany();
    }

    static async findByMonthRange(start: DateTime, end: DateTime) {
        logger.debug(
            'ScheduleRecord.findByMonthRange',
            'start: ',
            start.toString(),
            'end: ',
            end.toString()
        );
        return getConnection()
            .getRepository(ScheduleRecord)
            .createQueryBuilder('calendar')
            .where('calendar.date >= :start')
            .andWhere('calendar.date <= :end')
            .setParameter(
                'start',
                start.startOf('month').toFormat('yyyy-MM-dd')
            )
            .setParameter('end', end.endOf('month').toFormat('yyyy-MM-dd'))
            .getMany();
    }

    static async findByDay(date: DateTime) {
        logger.debug('ScheduleRecord.findByDay', 'date: ', date.toString());
        return getConnection()
            .getRepository(ScheduleRecord)
            .createQueryBuilder('calendar')
            .where('calendar.date = :date', {
                date: date.toFormat('yyyy-MM-dd'),
            })
            .getMany();
    }

    static async findByDayRange(start: DateTime, end: DateTime) {
        logger.debug(
            'ScheduleRecord.findByDayRange',
            'start: ',
            start.toString(),
            'end: ',
            end.toString()
        );
        return getConnection()
            .getRepository(ScheduleRecord)
            .createQueryBuilder('calendar')
            .where('calendar.date >= :start')
            .andWhere('calendar.date <= :end')
            .setParameter('start', start.toFormat('yyyy-MM-dd'))
            .setParameter('end', end.toFormat('yyyy-MM-dd'))
            .getMany();
    }
}
