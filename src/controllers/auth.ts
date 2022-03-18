import { Request as IRequest, Response as IResponse } from 'express';
import {
    Response,
    Request,
    Controller,
    Get,
    Delete,
    Put,
    Body,
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
import { celebrate } from 'celebrate';
import { updateUserValidator } from '../validators/user';

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

    @Get('/user', [accessTokenGuard])
    async getUser(@Request() req: any, @Response() res: IResponse) {
        return res.status(HttpStatusCode.OK).json(req.user);
    }

    @Get('/user/club', [accessTokenGuard])
    async getUserIncludeClub(@Request() req: any, @Response() res: IResponse) {
        const user = await this.authService.getUserById(req.user.id, [
            'clubInfo',
        ]);
        return res.status(HttpStatusCode.OK).json(user);
    }

    @Put('/user', [accessTokenGuard, celebrate(updateUserValidator)])
    async updateUser(
        @Request() req: any,
        @Body() user: any,
        @Response() res: IResponse
    ) {
        try {
            const updatedUser = await this.authService.updateAndGetUser({
                ...user,
                id: req.user.id,
            });
            return res.status(HttpStatusCode.CREATED).json(updatedUser);
        } catch (_err) {
            return res.status(HttpStatusCode.CONFLICT).json('error');
        }
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

    @Delete('/', [refreshTokenGuard])
    async logout(@Request() req: any, @Response() res: IResponse) {
        await this.authService.removeRefreshTokenByUserId(req.user.id);
        res.clearCookie(REFRESH_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_OPTION);
        return res.status(HttpStatusCode.OK).json('success');
    }
}
