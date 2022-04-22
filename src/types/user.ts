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
    role: number;
    accessToken?: string;
}

export interface UserUpdateBody {
    description?: string;
    image?: string;
    githubLink?: string;
    clubInfo?: number;
    subClubInfo?: number[];
}

export { User as IUser };

export default User;
