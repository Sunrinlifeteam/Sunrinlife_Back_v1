import { Response as IResponse } from 'express';
import { Response, Request, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import passport from 'passport';
import { AuthService } from '../services/auth';
import logger from '../modules/logger';
import HttpStatusCode from '../constants/HttpStatusCode';

@Controller('/auth')
@Injectable()
export class AuthController {
    constructor(private readonly authService: AuthService) {
        logger.log('AuthController Attached!');
    }

    @Get('/')
    async hello(@Response() res: IResponse) {
        const result = await this.authService.hello();
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Get('/google', [
        passport.authenticate('google', { scope: ['email', 'profile'] }),
    ])
    googleLogin() {}

    @Get('/google/redirect', [passport.authenticate('google')])
    async googleRedirect(@Request() req: any, @Response() res: IResponse) {
        const { user } = req;
        const { email } = user;
        const userIsExist = !!(await this.authService.getUserByEmail(email));
        if (!userIsExist) await this.authService.createUser(user);
        return res.status(200).json(user);
    }
}
