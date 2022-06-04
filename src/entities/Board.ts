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
import * as Board from '../types/board';
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

    @Column({ nullable: false, default: Board.Type.anonymous })
    type: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    // @Column({ nullable: false })
    // authorId: string;

    @ManyToOne((type) => UserEntity, { eager: true })
    @JoinColumn()
    author?: UserEntity;

    @ManyToMany(() => AttachmentEntity)
    @JoinTable()
    attachment: AttachmentEntity[];
}
