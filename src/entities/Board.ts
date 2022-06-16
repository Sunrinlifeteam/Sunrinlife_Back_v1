import { Injectable } from '@decorators/di';
import {
    AfterLoad,
    BeforeInsert,
    BeforeUpdate,
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

@Injectable()
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ default: 0 })
    views: number;

    @AfterLoad()
    @BeforeInsert()
    @BeforeUpdate()
    updateLikes() {
        this.likes = this.likedUsers.length;
    }

    @Column({ default: 0 })
    likes: number;

    // @Column({ nullable: false, default: Board.Type.anonymous })
    // type: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany((type) => UserEntity, {
        cascade: true,
        eager: true,
    })
    @JoinTable()
    likedUsers: UserEntity[];

    @ManyToMany(() => AttachmentEntity)
    @JoinTable()
    attachments: AttachmentEntity[];

    author: UserEntity;

    /**
     * Override toString() method
     * @override
     * @returns {string}
     */
    toString() {
        return JSON.stringify({
            id: this.id,
            title: this.title,
            content: this.content,
            views: this.views,
            likes: this.likes,
            created: this.created,
            updated: this.updated,
            attachments: this.attachments,
        });
    }
}

@Entity('named_board')
@Injectable()
export class NamedBoardEntity extends BoardEntity {
    @ManyToOne((type) => UserEntity, { eager: true })
    @JoinColumn()
    author: UserEntity;
}

@Entity('anonymous_board')
@Injectable()
export class AnonymousBoardEntity extends BoardEntity {
    // TODO: author column change to encrypted user id
    @ManyToOne((type) => UserEntity)
    @JoinColumn()
    author: UserEntity;
}
