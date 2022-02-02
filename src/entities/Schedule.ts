/* eslint-disable no-unused-vars */
import { Entity, Column, BaseEntity, OneToMany, ManyToMany } from 'typeorm';
import { Attachment } from './Attachment';

@Entity()
export class Schedule extends BaseEntity {
    @Column({ type: 'string', nullable: false })
    date: string;

    @Column({ type: 'string', nullable: false })
    title: string;

    @Column({ type: 'string', nullable: false })
    body: string;

    // eslint-disable-next-line prettier/prettier
    @ManyToMany(type => Attachment)
    attachment: Attachment[];
}
