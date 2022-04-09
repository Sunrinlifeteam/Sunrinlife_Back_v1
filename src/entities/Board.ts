import { Injectable } from '@decorators/di';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AttachmentEntity } from './Attachment';
import { UserEntity } from './User';

@Entity('board')
@Injectable()
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    author: UserEntity;

    @ManyToMany(() => AttachmentEntity)
    @JoinTable()
    attachment: AttachmentEntity[];
}
