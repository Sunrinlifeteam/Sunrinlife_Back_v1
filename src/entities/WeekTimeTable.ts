import { Injectable } from '@decorators/di';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { TimeTableEntity } from './TimeTable';

export const WEEK_TIMETABLE_SELECT: (keyof WeekTimeTableEntity)[] = [
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

    @ManyToOne( () => TimeTableEntity )
    @JoinTable()
    sun: TimeTableEntity;

    @ManyToOne( () => TimeTableEntity )
    @JoinTable()
    mon: TimeTableEntity;

    @ManyToOne( () => TimeTableEntity )
    @JoinTable()
    tue: TimeTableEntity;

    @ManyToOne( () => TimeTableEntity )
    @JoinTable()
    wed: TimeTableEntity;

    @ManyToOne( () => TimeTableEntity )
    @JoinTable()
    thu: TimeTableEntity;

    @ManyToOne( () => TimeTableEntity )
    @JoinTable()
    fri: TimeTableEntity;

    @ManyToOne( () => TimeTableEntity )
    @JoinTable()
    sat: TimeTableEntity;
}