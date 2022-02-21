/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { AttachmentRecord } from './Attachment';

@Entity('school_notice')
export class SchoolNotice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    created: Date;

    // eslint-disable-next-line prettier/prettier
    @ManyToMany((type) => AttachmentRecord)
    @JoinTable()
    attachment: AttachmentRecord[];
}
