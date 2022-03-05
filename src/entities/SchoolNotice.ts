/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    getConnection,
} from 'typeorm';
import { Attachment } from './Attachment';

@Entity('school_notice')
export class SchoolNoticeData extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    created: Date;

    // eslint-disable-next-line prettier/prettier
    @ManyToMany((type) => Attachment)
    @JoinTable()
    attachment: Attachment[];
}
