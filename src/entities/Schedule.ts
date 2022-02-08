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
import { Attachment } from './Attachment';

@Entity()
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    body: string;

    // eslint-disable-next-line prettier/prettier
    @ManyToMany((type) => Attachment)
    @JoinTable()
    attachment: Attachment[];

    static findByDate(date: Date) {
        const dateString = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
        return this.createQueryBuilder('schedule')
            .where('schedule.date = :date', { date: dateString })
            .getOne();
    }
}
