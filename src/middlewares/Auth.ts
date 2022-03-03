import { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import { User } from '../entities/User';
import SessionData from '../models/sessionData';

export function AuthMiddleware(
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction
) {
    let sessionData: session.Session &
        Partial<session.SessionData> &
        SessionData = req.session;
    // TODO
    // 임시로만 구현해둠
    if (!sessionData.accountId) res.redirect('/login');
    console.log(sessionData.accountId);
    res.locals.user = User.findOne(sessionData.accountId);
    sessionData.save();
}
export default AuthMiddleware;
