import { Response as IResponse, Request as IRequest } from 'express';
import { Response, Request, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { TimeTableService } from '../services/timeTable';
import { accessTokenGuard } from '../modules/passport';
import { ErrorHandler } from '../modules/ErrorHandler';
import HttpStatusCode from '../constants/HttpStatusCode';

@Controller('/timetable')
@Injectable()
export class TimeTableController {
    constructor(private readonly timeTableService: TimeTableService) {
        logger.log('TimeTableController Attached!');
    }

    @Get('/today')
    async getTodayTimeTable(
        @Request() req: IRequest,
        @Response() res: IResponse
    ) {
        try {
            const result = await this.timeTableService.getTodayTimeTable();
            return res.status(HttpStatusCode.OK).json({
                data: result,
            });
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    //non-used
    @Get('/current', [accessTokenGuard])
    async getCurrentTimeTable(
        @Request() req: IRequest,
        @Response() res: IResponse
    ) {
        if (!req.user) {
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        }
        try {
            const result = await this.timeTableService.getCurrentTimeTable();
            return res.status(HttpStatusCode.OK).json(result);
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }
}
