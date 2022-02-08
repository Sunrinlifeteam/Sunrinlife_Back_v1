/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
} from 'typeorm';
import { Attachment } from './Attachment';

@Entity()
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
    @ManyToMany((type) => Attachment)
    attachment: Attachment[];
}
