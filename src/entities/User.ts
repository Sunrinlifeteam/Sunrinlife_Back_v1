import { Injectable } from '@decorators/di';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { UserDepartment } from '../types/user';
import { BoardEntity } from './Board';
import { ClubInfoEntity } from './ClubInfo';

export const USER_SELECT: (keyof UserEntity)[] = [
    'id',
    'email',
    'username',
    'department',
    'grade',
    'class',
    'number',
    'role',
    'accountType',
    'description',
    'githubLink',
    'image',
];

export const USER_RELATIONS: (keyof UserEntity)[] = ['clubInfo', 'subClubInfo'];

@Entity('user')
@Injectable()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, length: 10 })
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

    @Column({ type: 'bigint', default: 0, nullable: false })
    role: number;

    @Column({ length: 200, nullable: true, select: false })
    refreshToken: string;

    @Column({ length: 150, nullable: true })
    description: string;

    @Column({ length: 200, nullable: true })
    githubLink: string;

    @Column({ type: 'mediumtext', nullable: true })
    image: string;

    @Column({ nullable: true, unique: true })
    libraryId: string;

    @Column({ nullable: true, unique: true })
    teacherEmail: string;

    @ManyToOne(() => ClubInfoEntity, (clubInfo) => clubInfo.users)
    @JoinColumn()
    clubInfo: ClubInfoEntity;

    @ManyToMany(() => ClubInfoEntity)
    @JoinTable()
    subClubInfo: ClubInfoEntity[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
