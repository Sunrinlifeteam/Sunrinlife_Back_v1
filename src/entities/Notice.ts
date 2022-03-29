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

@Entity('notice')
@Injectable()
export class NoticeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    type: 'school' | 'intranet';

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(() => AttachmentEntity)
    @JoinTable()
    attachment: AttachmentEntity[];
}
