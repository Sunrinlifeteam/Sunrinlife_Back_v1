import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    getConnection,
} from 'typeorm';
import { User } from './User';

@Entity('userschedule')
export class UserSchedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: true })
    body: string;

    @ManyToOne((type) => User, (user) => user.id)
    owner: User;
}
