/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
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
    attachment: Attachment[];
}
