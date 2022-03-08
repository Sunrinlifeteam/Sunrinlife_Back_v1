import { Injectable } from '@decorators/di';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
@Injectable()
export class ScheduleEntity {
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
}
