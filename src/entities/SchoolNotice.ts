/* eslint-disable no-unused-vars */
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    getConnection,
} from 'typeorm';
import { AttachmentRecord } from './Attachment';

@Entity('school_notice')
export class SchoolNoticeData extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    created: Date;

    // eslint-disable-next-line prettier/prettier
    @ManyToMany((type) => AttachmentRecord)
    @JoinTable()
    attachment: AttachmentRecord[];

    static async list() {
        return getConnection()
            .getRepository(SchoolNoticeData)
            .createQueryBuilder('SchoolNotice')
            .getMany();
    }

    static async findById(id: number) {
        return getConnection()
            .getRepository(SchoolNoticeData)
            .createQueryBuilder('SchoolNotice')
            .where('SchoolNotice.id = :id', { id: id })
            .getOne();
    }
}
