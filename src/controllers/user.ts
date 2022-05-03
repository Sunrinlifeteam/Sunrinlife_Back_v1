import { Injectable } from '@decorators/di';
import {
    Body,
    Controller,
    Get,
    Params,
    Put,
    Request,
    Response,
} from '@decorators/express';
import { celebrate } from 'celebrate';
import { Request as IRequest, Response as IResponse } from 'express';
import { CLUB_TYPE, ROLE_FLAG } from '../constants';
import HttpStatusCode from '../constants/HttpStatusCode';
import { accessTokenGuard } from '../modules/passport';
import permission from '../modules/permission';
import { UserService } from '../services/user';
import { UserUpdateBody } from '../types/user';
import { updateUserValidator } from '../validators/user';

@Controller('/user', [accessTokenGuard])
@Injectable()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    async getUser(@Request() req: IRequest, @Response() res: IResponse) {
        return res.status(HttpStatusCode.OK).json(req.user);
    }

    @Get('/club')
    async getUserIncludeClub(
        @Request() req: IRequest,
        @Response() res: IResponse
    ) {
        if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        const user = await this.userService.fetchWithRelations(req.user.id, [
            'clubInfo',
        ]);
        return res.status(HttpStatusCode.OK).json(user);
    }

    @Get('/full')
    async getUserFullData(
        @Request() req: IRequest,
        @Response() res: IResponse
    ) {
        if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        const user = await this.userService.fetchWithRelations(req.user.id);
        return res.status(HttpStatusCode.OK).json(user);
    }

    @Get('/:id')
    async getOtherUser(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: string
    ) {
        if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        const user = await this.userService.fetch(id);
        return res.status(HttpStatusCode.OK).json(user);
    }

    @Get('/:id/club')
    async getOtherUserIncludeClub(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: string
    ) {
        if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        const user = await this.userService.fetchWithRelations(id, [
            'clubInfo',
        ]);
        return res.status(HttpStatusCode.OK).json(user);
    }

    @Get('/:id/full')
    async getOtherUserFullData(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: string
    ) {
        if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        const user = await this.userService.fetchWithRelations(id);
        return res.status(HttpStatusCode.OK).json(user);
    }

    @Put('/', [celebrate(updateUserValidator)] as any[])
    async updateUser(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Body() user: UserUpdateBody
    ) {
        try {
            if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
            if (user.clubInfo == 0) user.clubInfo = undefined;
            if (user.clubInfo) {
                const type = await this.userService.getClubType(user.clubInfo);
                if (type == undefined || type == CLUB_TYPE.AUTONOMY)
                    user.clubInfo = undefined;
            }
            if (user.subClubInfo) {
                await this.userService.updateSubClub(
                    req.user.id,
                    user.subClubInfo
                );
                delete user.subClubInfo;
            }
            console.log(user);
            await this.userService.update(req.user.id, user);
            return res.sendStatus(HttpStatusCode.NO_CONTENT);
        } catch (_err) {
            console.log(_err);
            return res.status(HttpStatusCode.CONFLICT).json('error');
        }
    }

    @Put('/:id', [
        permission([ROLE_FLAG.ADMIN]),
        celebrate(updateUserValidator),
    ] as any[])
    async updateUserForce(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: string,
        @Body() user: UserUpdateBody
    ) {
        try {
            if (!req.user) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
            if (!user.clubInfo) delete user.clubInfo;
            await this.userService.update(id, user);
            return res.sendStatus(HttpStatusCode.NO_CONTENT);
        } catch (_err) {
            return res.status(HttpStatusCode.CONFLICT).json('error');
        }
    }
}
