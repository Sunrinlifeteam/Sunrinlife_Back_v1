import { Response as IResponse } from 'express';
import { Response, Controller, Get, Post, Body } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { ScheduleService } from '../services/schedule';
import logger from '../modules/logger';
import { IScheduleBody } from '../models/schedule';
import { writeValidator } from '../validators/schedule';
import { celebrate } from 'celebrate';

@Controller('/schedule')
@Injectable()
export class ScheduleController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly scheduleService: ScheduleService) {
        logger.debug('ScheduleController Attached!');
    }

    @Get('/')
    async list(@Response() res: IResponse) {
        const result = await this.scheduleService.list();
        return res.status(200).json(result);
    }

    @Get('/today')
    async today(@Response() res: IResponse) {
        const result = await this.scheduleService.today();
        return res.status(200).json(result);
    }

    @Post('/write', [celebrate(writeValidator) as any])
    async write(@Response() res: IResponse, @Body() body: IScheduleBody) {
        const result = await this.scheduleService.write(body);
        return res.status(201).json(result);
    }
}
