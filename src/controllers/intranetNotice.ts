import { Response as IResponse, Request as IRequest } from 'express';
import { Response, Request, Controller, Get, Post } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { IntranetNoticeService } from '../services/intranetNotice';

@Controller('/notice/intranet')
@Injectable()
export class IntranetNoticeController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly noticeService: IntranetNoticeService) {}

    @Get('/')
    list(@Response() res: IResponse) {
        const result = this.noticeService.list();
        return res.status(200).json(result);
    }

    @Get('/get')
    get(@Response() res: IResponse) {
        const result = this.noticeService.get();
        return res.status(200).json(result);
    }

    @Post('/')
    add(@Response() res: IResponse ,@Request() req: IRequest) {
        // TODO
    }
}