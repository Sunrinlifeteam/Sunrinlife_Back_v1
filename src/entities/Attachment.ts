import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Attachment extends BaseEntity {
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

    static findById(id: number) {
        return this.createQueryBuilder('attachment')
            .where('attachment.id = :id', { id: id })
            .getOne();
    }
}
