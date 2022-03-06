import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    getConnection,
    ManyToOne,
} from 'typeorm';
import path from 'path';
import { User } from './User';

@Entity('attachment')
export class Attachment {
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

    @ManyToOne((type) => User, (user) => user.id)
    author: User;

    getPath(): string {
        return path.resolve(process.cwd(), this.path, this.sha1hash);
    }
}
