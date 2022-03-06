import { departments } from '../constants';

export type UserDepartment = typeof departments[number];

export interface User {
    email: string;
    username: string;
    department: UserDepartment;
    grade: number;
    class: number;
    number: number;
    accountType: number;
    accessToken?: string;
}

export { User as IUser };

export default User;
