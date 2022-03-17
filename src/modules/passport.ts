import passport from 'passport';
import { Container } from '@decorators/di';
import { ExtractJwt, StrategyOptions, VerifyCallback } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserEntity, USER_SELECT } from '../entities/User';
import { isNumberic } from './isNumberic';
import { IUser } from '../types/user';
import { getDepartmentByClass } from './getDepartment';
import {
    ACCOUNT_TYPE,
    REFRESH_TOKEN_COOKIE_KEY,
    SUNRIN_STUDENT_EMAIL_PATTERN,
} from '../constants';

export const jwtConfig: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

export const jwtVerify: VerifyCallback = async ({ id }, done) => {
    try {
        const userRepository =
            Container.get<Repository<UserEntity>>(UserEntity);
        const user = await userRepository.findOne({
            where: { id },
            select: USER_SELECT,
        });
        if (user) return done(null, user);
        return done(null, false, { reason: 'Unauthorized' });
    } catch (err) {
        console.error(err);
        return done(err);
    }
};

export const jwtRefreshVerify: VerifyCallback = async (req: Request, done) => {
    try {
        const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_KEY];
        if (refreshToken) {
            const id = (
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
                    id: string;
                }
            )?.id;
            const userRepository =
                Container.get<Repository<UserEntity>>(UserEntity);
            const user = (await userRepository.findOne({
                where: { id },
                select: [...USER_SELECT, 'refreshToken'],
            })) as any;
            if (user && user.refreshToken === refreshToken) {
                delete user['refreshToken'];
                return done(null, user);
            }
        }
        return done(null, false, { reason: 'Unauthorized' });
    } catch (err) {
        console.error(err);
        return done(err);
    }
};

export const refreshTokenGuard = passport.authenticate('jwt-refresh');
export const accessTokenGuard = passport.authenticate('jwt');

export async function googleOAuthHandler(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any
) {
    let { familyName, givenName } = profile.name;
    const email = profile.emails[0].value;
    if (SUNRIN_STUDENT_EMAIL_PATTERN.test(email)) {
        if (isNumberic(familyName))
            givenName = [familyName, (familyName = givenName)][0];
        const userClass = +givenName.substring(1, 3);
        const user: IUser = {
            email,
            username: familyName,
            department: getDepartmentByClass(userClass),
            grade: +givenName.substring(0, 1),
            class: userClass,
            number: +givenName.substring(3, 5),
            accountType: ACCOUNT_TYPE.STUDENT,
        };
        return done(null, user);
    }
    return done(null, false, { reason: 'Unauthorized' });
}
