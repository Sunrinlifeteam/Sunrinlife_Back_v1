import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    getConnection,
} from 'typeorm';

@Entity('attachment')
export class AttachmentRecord extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    filename: string;

    @Column({ nullable: false })
    path: string; // 파일이 저장된 경로

    @PrimaryColumn({ nullable: false, unique: true })
    sha1hash: string;

    @PrimaryColumn({ nullable: false, unique: true })
    md5hash: string;

    @Column({ nullable: false })
    mimetype: string;

    static async findById(id: number) {
        return getConnection()
            .getRepository(AttachmentRecord)
            .createQueryBuilder('attachment')
            .where('attachment.id = :id', { id: id })
            .getOne();
    }
}
