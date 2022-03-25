import { UserEntity } from '../entities/User';

export interface IWriteUserScheduleBody {
    date: string;
    body: string;
}

export interface IUserSchedule {
    date: string;
    body: string;
    owner: UserEntity;
}
