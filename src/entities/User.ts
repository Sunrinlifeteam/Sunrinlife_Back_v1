import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'string', nullable: false, unique: true })
    email: string;

    @Column({ type: 'string', nullable: true, unique: true })
    teacherEmail: string;

    @Column({ type: 'string', nullable: false })
    password: string;

    @Column({ type: 'string', nullable: false, unique: true, length: 10 })
    username: string;

    @Column({ type: 'string', nullable: false })
    department: string;

    @Column({ type: 'int', nullable: true })
    grade: number;

    @Column({ type: 'int', nullable: true })
    class: number;

    @Column({ type: 'int', nullable: true })
    number: number;

    @Column({ type: 'int', default: 0, nullable: false })
    accountType: number;
}
