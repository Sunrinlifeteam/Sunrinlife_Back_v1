"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuthHandler = exports.accessTokenGuard = exports.refreshTokenGuard = exports.jwtRefreshVerify = exports.jwtVerify = exports.jwtConfig = void 0;
const passport_1 = __importDefault(require("passport"));
const di_1 = require("@decorators/di");
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const isNumberic_1 = require("./isNumberic");
const getDepartment_1 = require("./getDepartment");
const constants_1 = require("../constants");
exports.jwtConfig = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};
const jwtVerify = async ({ id }, done) => {
    try {
        const userRepository = di_1.Container.get(User_1.UserEntity);
        const user = await userRepository.findOne({
            where: { id },
            select: User_1.USER_SELECT,
        });
        if (user)
            return done(null, user);
        return done(null, false, { reason: 'Unauthorized' });
    }
    catch (err) {
        console.error(err);
        return done(err);
    }
};
exports.jwtVerify = jwtVerify;
const jwtRefreshVerify = async (req, done) => {
    var _a;
    try {
        const refreshToken = req.cookies[constants_1.REFRESH_TOKEN_COOKIE_KEY];
        if (refreshToken) {
            const id = (_a = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)) === null || _a === void 0 ? void 0 : _a.id;
            const userRepository = di_1.Container.get(User_1.UserEntity);
            const user = (await userRepository.findOne({
                where: { id },
                select: [...User_1.USER_SELECT, 'refreshToken'],
            }));
            if (user && user.refreshToken === refreshToken) {
                delete user['refreshToken'];
                return done(null, user);
            }
        }
        return done(null, false, { reason: 'Unauthorized' });
    }
    catch (err) {
        console.error(err);
        return done(err);
    }
};
exports.jwtRefreshVerify = jwtRefreshVerify;
exports.refreshTokenGuard = passport_1.default.authenticate('jwt-refresh');
exports.accessTokenGuard = passport_1.default.authenticate('jwt');
async function googleOAuthHandler(_accessToken, _refreshToken, profile, done) {
    let { familyName, givenName } = profile.name;
    const email = profile.emails[0].value;
    if (constants_1.SUNRIN_STUDENT_EMAIL_PATTERN.test(email)) {
        if ((0, isNumberic_1.isNumberic)(familyName))
            givenName = [familyName, (familyName = givenName)][0];
        const userClass = +givenName.substring(1, 3);
        const user = {
            email,
            username: familyName,
            department: (0, getDepartment_1.getDepartmentByClass)(userClass),
            grade: +givenName.substring(0, 1),
            class: userClass,
            number: +givenName.substring(3, 5),
            accountType: constants_1.ACCOUNT_TYPE.STUDENT,
        };
        return done(null, user);
    }
    return done(null, false, { reason: 'Unauthorized' });
}
exports.googleOAuthHandler = googleOAuthHandler;
//# sourceMappingURL=passport.js.map