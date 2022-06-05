import { Response as IResponse } from 'express';
import { Response, Controller, Get, Body } from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { ScheduleService } from '../services/schedule';
import { DateValidator } from '../validators/schedule';
import { celebrate } from 'celebrate';
import { DateTimeBody } from '../types/datetime';

@Controller('/schedule')
@Injectable()
export class ScheduleController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly service: ScheduleService) {
        logger.log('ScheduleController Attached!');
    }

    @Get('/', [celebrate(DateValidator)] as any[])
    async Get(@Response() res: IResponse, @Body() body: DateTimeBody) {
        const result = await this.service.getByDay(body);
        return res.status(200).json(result);
    }

    @Get('/month', [celebrate(DateValidator)] as any[])
    async GetMonth(@Response() res: IResponse, @Body() body: DateTimeBody) {
        const result = await this.service.getByMonth(body);
        return res.status(200).json(result);
    }

    @Get('/week', [celebrate(DateValidator)] as any[])
    async GetWeek(@Response() res: IResponse, @Body() body: DateTimeBody) {
        const result = await this.service.getByWeek(body);
        return res.status(200).json(result);
    }
}
