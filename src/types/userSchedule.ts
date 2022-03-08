import { UserEntity } from '../entities/User';

export interface IWriteUserScheduleBody {
    body: string;
}

export interface IUserSchedule {
    date: string;
    body: string;
    owner: UserEntity;
}
