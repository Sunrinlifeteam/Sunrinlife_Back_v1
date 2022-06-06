import { Request as IRequest, Response as IResponse } from 'express';
import {
    Request,
    Response,
    Controller,
    Get,
    Body,
    Post,
    Delete,
    Params,
    Put,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { UserScheduleService } from '../services/userSchedule';
import logger from '../modules/logger';
import { writeValidator } from '../validators/userSchedule';
import { celebrate } from 'celebrate';
import { User as IUser } from '../types/user';
import { accessTokenGuard } from '../modules/passport';
import { IUserSchedule, IWriteUserScheduleBody } from '../types/userSchedule';
import { ErrorHandler } from '../modules/ErrorHandler';
import HttpStatusCode from '../constants/HttpStatusCode';

@Controller('/me/schedule')
@Injectable()
export class UserScheduleController {
    constructor(private readonly service: UserScheduleService) {
        logger.log('UserScheduleController Attached!');
    }

    @Get('/', [accessTokenGuard])
    async week(@Request() req: IRequest, @Response() res: IResponse) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service.week(req.user);
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Post('/write', [accessTokenGuard, celebrate(writeValidator)])
    async write(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Body() body: IWriteUserScheduleBody
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service.write(req.user, body);
        return res.status(HttpStatusCode.CREATED).json(result);
    }

    @Put('/:id', [accessTokenGuard, celebrate(writeValidator)])
    async update(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: number,
        @Body() body: IWriteUserScheduleBody
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service.update(req.user, id, body);
        logger.debug('controllers/userSchedule.ts', 'update', req.user, result);
        return res.sendStatus(HttpStatusCode.NO_CONTENT);
    }

    @Delete('/:id', [accessTokenGuard])
    async delete(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service.delete(req.user, id);
        logger.debug('controllers/userSchedule.ts', 'delete', req.user, result);
        return res.sendStatus(HttpStatusCode.NO_CONTENT);
    }
}
