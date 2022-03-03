import { Request } from 'express';
import { departments } from '../constants';

export type UserDepartment = typeof departments[number];

export interface IRequestIncludeUser extends Request {
    user: IUser;
}

export interface IUser {
    email: string;
    username: string;
    department: UserDepartment;
    grade: number;
    class: number;
    number: number;
    accountType: number;
    accessToken?: string;
}
