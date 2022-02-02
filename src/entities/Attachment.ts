import { Entity, Column, BaseEntity } from 'typeorm';

@Entity()
export class Attachment extends BaseEntity {
    @Column({ type: 'string', nullable: false })
    filename: string;

    @Column({ type: 'string', nullable: false })
    path: string; // 파일이 저장된 경로

    @Column({ type: 'string', nullable: false, unique: true })
    sha1hash: string;

    @Column({ type: 'string', nullable: false, unique: true })
    md5: string;

    @Column({ type: 'string', nullable: false })
    mimetype: string;
}
