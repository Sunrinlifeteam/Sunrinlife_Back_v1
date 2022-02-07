import { Response as IResponse, Request as IRequest } from 'express';
import { Response, Request, Controller, Get, Post } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { SchoolNoticeService } from '../services/schoolNotice';

@Controller('/notice/school')
@Injectable()
export class SchoolNoticeController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly schoolNoticeService: SchoolNoticeService) {}

    @Get('/')
    list(@Response() res: IResponse) {
        const result = this.schoolNoticeService.list();
        return res.status(200).json(result);
    }

    @Get('/get')
    get(@Response() res: IResponse) {
        const result = this.schoolNoticeService.get();
        return res.status(200).json(result);
    }

    @Post('/')
    add(@Response() res: IResponse ,@Request() req: IRequest) {
        // TODO
    }
}