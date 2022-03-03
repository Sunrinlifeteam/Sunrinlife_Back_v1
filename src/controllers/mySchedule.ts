import { Response as IResponse } from 'express';
import { Response, Controller, Get, Body, Post } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { MyScheduleService } from '../services/mySchedule';
import logger from '../modules/logger';
import { IMyScheduleBody } from '../models/mySchedule';
import { writeValidator } from '../validators/mySchedule';
import { celebrate } from 'celebrate';
import AuthMiddleware from '../middlewares/Auth';
import { User } from '../entities/User';
import HttpStatusCode from '../constants/HttpStatusCode';

@Controller('/me/schedule')
@Injectable()
export class MyScheduleController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly service: MyScheduleService) {
        logger.log('MyScheduleController Attached!');
    }

    private LogError(functionName: string, errorMessage: string) {
        logger.error(
            'Error on\n',
            '\tcontrollers.mySchedule.ts\n',
            `\tMyScheduleController.${functionName}\n`,
            errorMessage
                .split('\n')
                .map((x) => `-${x}`)
                .join('\n')
        );
    }

    @Get('/', [AuthMiddleware as any])
    async list(@Response() res: IResponse) {
        if (!(res.locals.user && res.locals.user instanceof User)) {
            this.LogError('list', 'res.locals.user is Empty');
            res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const result = await this.service.list(res.locals.user);
        return res.status(200).json(result);
    }

    @Post('/write', [celebrate(writeValidator) as any])
    async write(@Response() res: IResponse, @Body() body: IMyScheduleBody) {
        const result = await this.service.write(body);
        return res.status(201).json(result);
    }
}
