import { isNumberic } from './isNumberic';
import { IUser } from '../types/user';
import { getDepartmentByClass } from './getDepartment';
import { ACCOUNT_TYPE } from '../constants';

export async function oAuthHandler(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any
) {
    let { familyName, givenName } = profile.name;
    if (isNumberic(familyName))
        givenName = [familyName, (familyName = givenName)][0];
    const userClass = +givenName.substring(1, 3);
    const user: IUser = {
        email: profile.emails[0].value,
        username: familyName,
        department: getDepartmentByClass(userClass),
        grade: +givenName.substring(0, 1),
        class: userClass,
        number: +givenName.substring(3, 5),
        accountType: ACCOUNT_TYPE.STUDENT,
    };
    return done(null, user);
}
