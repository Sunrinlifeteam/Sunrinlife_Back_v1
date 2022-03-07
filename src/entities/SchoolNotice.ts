/* eslint-disable no-unused-vars */
import { Injectable } from '@decorators/di';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { AttachmentEntity } from './Attachment';

@Entity('school_notice')
@Injectable()
export class SchoolNoticeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    created: Date;

    @ManyToMany(() => AttachmentEntity)
    @JoinTable()
    attachment: AttachmentEntity[];
}
