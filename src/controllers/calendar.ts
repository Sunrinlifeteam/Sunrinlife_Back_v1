import { Response as IResponse } from 'express';
import { Response, Controller, Get, Body } from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { CalendarService } from '../services/calendar';
import { CalendarValidator } from '../validators/calendar';
import { celebrate } from 'celebrate';
import { IDateBody } from '../models/calendar';

@Controller('/calendar')
@Injectable()
export class CalendarController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly service: CalendarService) {
        logger.log('CalendarController Attached!');
    }

    @Get('/', [celebrate(CalendarValidator)] as any[])
    async Get(@Response() res: IResponse, @Body() body: IDateBody) {
        const result = await this.service.getByMonth(body);
        return res.status(200).json(result);
    }
}
