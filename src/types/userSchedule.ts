import { User } from '../entities/User';

export interface IUserSchedule {
    date: string;
    body: string;
    owner: User;
}
