/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
} from 'typeorm';
import { DateTime } from 'luxon';

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
        return ScheduleRecord.createQueryBuilder('calendar')
            .where('calendar.date like :date', {
                date: date.toFormat('yyyy-__-__'),
            })
            .getMany();
    }

    static async findByMonth(date: DateTime) {
        return ScheduleRecord.createQueryBuilder('calendar')
            .where('calendar.date like :date', {
                date: date.toFormat('yyyy-MM-__'),
            })
            .getMany();
    }

    static async findByMonthRange(start: DateTime, end: DateTime) {
        return ScheduleRecord.createQueryBuilder('calendar')
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
        return ScheduleRecord.createQueryBuilder('calendar')
            .where('calendar.date like :date', {
                date: date.toFormat('yyyy-MM-dd'),
            })
            .getMany();
    }

    static async findByDayRange(start: DateTime, end: DateTime) {
        return ScheduleRecord.createQueryBuilder('calendar')
            .where('calendar.date >= :start')
            .andWhere('calendar.date <= :end')
            .setParameter('start', start.toFormat('yyyy-MM-dd'))
            .setParameter('end', end.toFormat('yyyy-MM-dd'))
            .getMany();
    }
}
