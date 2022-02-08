import { Response as IResponse } from 'express';
import { Response, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { ScheduleService } from '../services/schedule';
import logger from '../module/logger';

@Controller('/schedule')
@Injectable()
export class ScheduleController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly scheduleService: ScheduleService) {
        logger.debug('ScheduleController Attached!');
    }

    @Get('/')
    list(@Response() res: IResponse) {
        const result = this.scheduleService.list();
        return res.status(200).json(result);
    }

    @Get('/today')
    today(@Response() res: IResponse) {
        const result = this.scheduleService.today();
        return res.status(200).json(result);
    }
}
