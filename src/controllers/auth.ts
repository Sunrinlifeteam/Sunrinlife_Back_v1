import {
    NextFunction,
    Request as IRequest,
    Response as IResponse,
} from 'express';
import {
    Response,
    Request,
    Controller,
    Get,
    Delete,
    Query,
} from '@decorators/express';
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
        const accessToken =
            this.authService.createAndGetAccessTokenByUserId(id);
        return res.status(HttpStatusCode.OK).json({ accessToken });
    }

    @Get('/valid', [accessTokenGuard])
    async checkAccessTokenIsValid(@Response() res: IResponse) {
        return res.status(HttpStatusCode.OK).json('valid');
    }

    @Get('/google', [
        function (req: IRequest, res: IResponse, next: NextFunction) {
            passport.authenticate('google', {
                scope: ['email', 'profile'],
                state:
                    req.query.redirect &&
                    encodeURI(req.query.redirect as string),
            })(req, res, next);
        } as any,
    ])
    googleLogin() {}

    @Get('/google/callback', [
        passport.authenticate('google', {
            failureRedirect: '/auth/google',
        }),
    ])
    async googleRedirect(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Query('state') state: string
    ) {
        let { user } = req;
        if (!user) return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
        const { email } = user;
        let savedUser = await this.authService.getUserByEmail(email);
        const isNewUser = !savedUser;
        if (isNewUser)
            savedUser = await this.authService.createAndGetUser(user);
        const refreshToken =
            await this.authService.createAndGetRefreshTokenByUserId(
                savedUser!.id
            );
        res.cookie(
            REFRESH_TOKEN_COOKIE_KEY,
            refreshToken,
            REFRESH_TOKEN_COOKIE_OPTION
        );
        return res.redirect(
            (state || process.env.FRONTEND_URL)! +
                (isNewUser ? '/register' : '')
        );
    }

    @Delete('/', [refreshTokenGuard])
    async logout(@Request() req: any, @Response() res: IResponse) {
        await this.authService.removeRefreshTokenByUserId(req.user.id);
        res.clearCookie(REFRESH_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_OPTION);
        return res.status(HttpStatusCode.OK).json('success');
    }
}
