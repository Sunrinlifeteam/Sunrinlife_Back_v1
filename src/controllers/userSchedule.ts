import { Request as IRequest, Response as IResponse } from 'express';
import {
    Request,
    Response,
    Controller,
    Get,
    Body,
    Post,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { UserScheduleService } from '../services/userSchedule';
import logger from '../modules/logger';
import { writeValidator } from '../validators/mySchedule';
import { celebrate } from 'celebrate';
import { User as IUser } from '../types/user';
import { accessTokenGuard } from '../modules/passport';
import { IUserSchedule, IWriteUserScheduleBody } from '../types/userSchedule';
import { ErrorHandler } from '../modules/ErrorHandler';

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
        const result = await this.service.week(res.locals.user);
        return res.status(200).json(result);
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
        return res.status(201).json(result);
    }
}
