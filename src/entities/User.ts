import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, unique: true, length: 10 })
    username: string;

    @Column({ nullable: false })
    department: string;

    @Column({ type: 'int', nullable: true })
    grade: number;

    @Column({ type: 'int', nullable: true })
    class: number;

    @Column({ type: 'int', nullable: true })
    number: number;

    @Column({ type: 'int', default: 0, nullable: false })
    accountType: number;

    @Column({ nullable: true })
    libraryId: string;

    @Column({ nullable: true, unique: true })
    teacherEmail: string;
}
