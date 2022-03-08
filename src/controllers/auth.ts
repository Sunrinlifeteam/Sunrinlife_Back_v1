import { Request as IRequest, Response as IResponse } from 'express';
import { Response, Request, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import passport from 'passport';
import { AuthService } from '../services/auth';
import logger from '../modules/logger';
import HttpStatusCode from '../constants/HttpStatusCode';
import { accessTokenGuard, refreshTokenGuard } from '../modules/passport';
import {
    REFRESH_TOKEN_COOKIE_KEY,
    REFRESH_TOKEN_COOKIE_OPTION,
} from '../constants';

@Controller('/auth')
@Injectable()
export class AuthController {
    constructor(private readonly authService: AuthService) {
        logger.log('AuthController Attached!');
    }

    @Get('/refresh', [refreshTokenGuard])
    async refreshAccessToken(@Request() req: any, @Response() res: IResponse) {
        const { id } = req.user;
        if (!id)
            return res.status(HttpStatusCode.UNAUTHORIZED).json('Unauthorized');
        const accessToken = this.authService.createAccessTokenByUserId(id);
        return res.status(HttpStatusCode.OK).json({ accessToken });
    }

    @Get('/valid', [accessTokenGuard])
    async checkAccessTokenIsValid(@Response() res: IResponse) {
        return res.status(HttpStatusCode.OK).json('valid');
    }

    @Get('/user', [accessTokenGuard])
    async getUser(@Request() req: any, @Response() res: IResponse) {
        return res.status(HttpStatusCode.OK).json(req.user);
    }

    @Get('/google', [
        passport.authenticate('google', { scope: ['email', 'profile'] }),
    ])
    googleLogin() {}

    @Get('/google/callback', [
        passport.authenticate('google', { failureRedirect: '/auth/google' }),
    ])
    async googleRedirect(@Request() req: IRequest, @Response() res: IResponse) {
        let { user } = req;
        if (!user) return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
        const { email } = user;
        let savedUser = await this.authService.getUserByEmail(email);
        if (!savedUser)
            savedUser = await this.authService.createAndGetUser(user);
        const refreshToken =
            await this.authService.createAndGetRefreshTokenByUserId(
                savedUser.id
            );
        res.cookie(
            REFRESH_TOKEN_COOKIE_KEY,
            refreshToken,
            REFRESH_TOKEN_COOKIE_OPTION
        );
        return res.redirect(process.env.FRONTEND_URL!);
    }
}
