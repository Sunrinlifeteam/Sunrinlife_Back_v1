import { Injectable } from '@decorators/di';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { AttachmentEntity } from './Attachment';

@Entity('interaction_notice')
@Injectable()
export class IntranetNoticeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @CreateDateColumn()
    created: Date;

    @ManyToMany(() => AttachmentEntity)
    @JoinTable()
    attachment: AttachmentEntity[];
}
