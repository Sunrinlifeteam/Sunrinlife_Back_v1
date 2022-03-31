import { Request, RequestHandler, Response } from 'express';
import HttpStatusCode from '../constants/HttpStatusCode';

export function permission(roles: number[]): RequestHandler {
    return function (req: Request, res: Response, next: any) {
        if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        for (const role of roles) {
            console.log(req.user, role);
            if (!(req.user.role & role))
                return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        }
        next();
    };
}

export default permission;
