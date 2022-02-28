import { departments } from '../constants';
import { UserDepartment } from '../types/user';

export function getDepartmentByClass(userClass: number): UserDepartment {
    if (userClass < 4) return departments[0];
    else if (userClass < 7) return departments[1];
    else if (userClass < 10) return departments[2];
    return departments[3];
}
