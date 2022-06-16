import { Injectable } from '@decorators/di';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinTable,
} from 'typeorm';

export const WEEK_TIMETABLE_SELECT = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
];

@Entity('week_timetable')
@Injectable()
export class WeekTimeTableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    sun: number;

    @Column({ nullable: false })
    mon: number;

    @Column({ nullable: false })
    tue: number;

    @Column({ nullable: false })
    wed: number;

    @Column({ nullable: false })
    thu: number;

    @Column({ nullable: false })
    fri: number;

    @Column({ nullable: false })
    sat: number;
}
