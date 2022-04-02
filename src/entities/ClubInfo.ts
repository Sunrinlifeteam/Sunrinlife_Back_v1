import { Injectable } from '@decorators/di';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { CLUB_TYPE_VALUES } from '../constants';
import { UserEntity } from './User';

export const CLUB_SELECT: (keyof ClubInfoEntity)[] = [
    'name',
    'description',
    'url',
    'location',
    'logo_url',
    'facebook',
    'instagram',
    'leader',
    'viceleader',
    'leader_sns',
    'vleader_sns',
    'department',
    'type',
    'curriculum',
];

@Entity('clubinfo')
@Injectable()
export class ClubInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: true })
    url: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    logo_url: string;

    @Column({ nullable: true })
    facebook: string;

    @Column({ nullable: true })
    instagram: string;

    @Column({ nullable: false })
    leader: string;

    @Column({ nullable: false })
    viceleader: string;

    @Column({ nullable: true })
    leader_sns: string;

    @Column({ nullable: true })
    vleader_sns: string;

    @Column({ type: 'int', nullable: false })
    department: number;

    @Column({ type: 'int', nullable: false })
    type: CLUB_TYPE_VALUES;

    @Column({ type: 'text', nullable: true })
    curriculum: string;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[];
}
