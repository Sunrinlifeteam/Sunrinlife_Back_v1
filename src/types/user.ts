import { departments } from '../constants';

export type UserDepartment = typeof departments[number];

export interface IUser {
    email: string;
    username: string;
    department: UserDepartment;
    grade: number;
    class: number;
    number: number;
    accountType: number;
}
