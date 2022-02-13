import { Response as IResponse } from 'express';
import { Response, Controller, Get, Body } from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { ScheduleService } from '../services/schedule';
import { DateValidator } from '../validators/schedule';
import { celebrate } from 'celebrate';
import { IDateBody } from '../models/schedule';

@Controller('/schedule')
@Injectable()
export class ScheduleController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly service: ScheduleService) {
        logger.log('ScheduleController Attached!');
    }

    @Get('/', [celebrate(DateValidator)] as any[])
    async Get(@Response() res: IResponse, @Body() body: IDateBody) {
        const result = await this.service.getByMonth(body);
        return res.status(200).json(result);
    }
}
