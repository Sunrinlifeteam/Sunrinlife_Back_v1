/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    getConnection,
} from 'typeorm';
import { AttachmentRecord } from './Attachment';

@Entity('interaction_notice')
export class IntranetNoticeData extends BaseEntity {
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

    // eslint-disable-next-line prettier/prettier
    @ManyToMany((type) => AttachmentRecord)
    @JoinTable()
    attachment: AttachmentRecord[];

    static async list() {
        return getConnection()
            .getRepository(IntranetNoticeData)
            .createQueryBuilder('IntranetNotice')
            .getMany();
    }

    static async findById(id: number) {
        return getConnection()
            .getRepository(IntranetNoticeData)
            .createQueryBuilder('IntranetNotice')
            .where('IntranetNotice.id = :id', { id: id })
            .getOne();
    }
}
