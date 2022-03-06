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
export class Schedule extends BaseEntity {
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
