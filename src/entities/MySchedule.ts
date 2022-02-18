/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToOne,
    getConnection,
} from 'typeorm';
import { DateTime } from 'luxon';
import { AttachmentRecord } from './Attachment';
import { User } from './User';

@Entity('myschedule')
export class MyScheduleRecord extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    body: string;

    @ManyToOne((type) => User)
    owner: User;

    // eslint-disable-next-line prettier/prettier
    @ManyToMany((type) => AttachmentRecord)
    @JoinTable()
    attachment: AttachmentRecord[];

    static async findByDates(start: DateTime, end: DateTime) {
        const startString = start.toFormat('yyyy-MM-dd');
        const endString = end.toFormat('yyyy-MM-dd');
        return getConnection()
            .getRepository(MyScheduleRecord)
            .createQueryBuilder('schedule')
            .where('schedule.date >= :start')
            .andWhere('schedule.date <= :end')
            .setParameter('start', startString)
            .setParameter('end', endString)
            .getMany();
    }
    static async findByDate(date: Date) {
        const dateString = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
        return getConnection()
            .getRepository(MyScheduleRecord)
            .createQueryBuilder('schedule')
            .where('schedule.date = :date', { date: dateString })
            .getOne();
    }
}
