import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Attachment extends BaseEntity {
    @Column({ nullable: false })
    filename: string;

    @Column({ nullable: false })
    path: string; // 파일이 저장된 경로 (노출 금지)

    @PrimaryColumn({ nullable: false, unique: true })
    sha1hash: string;

    @PrimaryColumn({ nullable: false, unique: true })
    md5hash: string;

    @Column({ nullable: false })
    mimetype: string;
}
