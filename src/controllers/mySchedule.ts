import { Response as IResponse } from 'express';
import { Response, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { MyScheduleService } from '../services/mySchedule';
import logger from '../modules/logger';

@Controller('/me/schedule')
@Injectable()
export class MyScheduleController {
    // Deprecated...
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly service: MyScheduleService) {
        logger.log('MyScheduleController Attached!');
    }

    @Get('/')
    async list(@Response() res: IResponse) {
        const result = await this.service.list();
        return res.status(200).json(result);
    }

    @Get('/today')
    async today(@Response() res: IResponse) {
        const result = await this.service.today();
        return res.status(200).json(result);
    }

    // @Post('/write', [celebrate(writeValidator) as any])
    // async write(@Response() res: IResponse, @Body() body: IScheduleBody) {
    //     const result = await this.scheduleService.write(body);
    //     return res.status(201).json(result);
    // }
}
