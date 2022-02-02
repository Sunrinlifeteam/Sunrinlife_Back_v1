/* eslint-disable no-unused-vars */
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Attachment } from './Attachment';

@Entity()
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type : 'string', nullable: false})
    title: string;

    @Column({ type : 'string', nullable: false})
    content: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    // eslint-disable-next-line prettier/prettier
    @ManyToMany(type => Attachment)
    attachment: Attachment[];
}
