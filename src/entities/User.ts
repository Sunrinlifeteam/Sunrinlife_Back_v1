import { Injectable } from '@decorators/di';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserDepartment } from '../types/user';

@Entity('user')
@Injectable()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, unique: true, length: 10 })
    username: string;

    @Column({ nullable: false })
    department: UserDepartment;

    @Column({ type: 'int', nullable: false, unsigned: false })
    grade: number;

    @Column({ type: 'int', nullable: false, unsigned: false })
    class: number;

    @Column({ type: 'int', nullable: false, unsigned: true })
    number: number;

    @Column({ type: 'int', default: 0, nullable: false })
    accountType: number;

    @Column({ nullable: true, unique: true })
    libraryId: string;

    @Column({ nullable: true, unique: true })
    teacherEmail: string;
}
