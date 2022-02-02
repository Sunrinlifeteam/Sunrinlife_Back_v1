import { Response as IResponse } from 'express';
import { Response, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { NoticeService } from '../services/notice';

@Controller('/notice')
@Injectable()
export class ScheduleController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly scheduleService: NoticeService) {}

    // TODO
    
}