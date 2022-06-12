import { Injectable } from '@decorators/di';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export const TIMETABLE_SELECT: (keyof TimeTableEntity)[] = [
    'alias',
    'timeJson',
];

@Entity('timetable')
@Injectable()
export class TimeTableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    alias: string;

    @Column({ nullable: false, type: 'text' })
    timeJson: string;

    @Column({ nullable: false, type: 'boolean' })
    current: boolean;
}
