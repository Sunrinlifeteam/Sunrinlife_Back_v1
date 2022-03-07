import { Injectable } from '@decorators/di';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './User';

@Entity('user_schedule')
@Injectable()
export class UserScheduleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: true })
    body: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    owner: UserEntity;
}
