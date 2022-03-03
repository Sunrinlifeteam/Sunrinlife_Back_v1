import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    getConnection,
} from 'typeorm';
import { DateTime } from 'luxon';
import { User } from './User';

@Entity('myschedule')
export class MyScheduleRecord extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: true })
    body: string;

    // eslint-disable-next-line no-unused-vars
    @ManyToOne((type) => User, (user) => user.id)
    owner: User;

    static async findByDates(user: User, start: DateTime, end: DateTime) {
        const startString = start.toFormat('yyyy-MM-dd');
        const endString = end.toFormat('yyyy-MM-dd');
        return getConnection()
            .getRepository(MyScheduleRecord)
            .createQueryBuilder('schedule')
            .leftJoinAndSelect('schedule.user', 'user')
            .where('schedule.date >= :start')
            .andWhere('schedule.date <= :end')
            .andWhere('schedule.user.id = :userid')
            .setParameter('start', startString)
            .setParameter('end', endString)
            .setParameter('userid', user.id)
            .getMany();
    }
    static async findByDate(date: Date) {
        const dateString = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
        return getConnection()
            .getRepository(MyScheduleRecord)
            .findOne({ date: dateString }, { relations: ['user'] });
    }
}
