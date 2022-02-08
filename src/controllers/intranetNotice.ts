import { Response as IResponse, Request as IRequest } from 'express';
import { Response, Request, Controller, Get, Post, Delete } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { IntranetNoticeService } from '../services/intranetNotice';

@Controller('/notice/intranet')
@Injectable()
export class IntranetNoticeController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly intranetNoticeService: IntranetNoticeService) {}

    @Get('/list')
    list(@Response() res: IResponse) {
        const result = this.intranetNoticeService.list();
        return res.status(200).json(result);
    }

    @Get('/:id')
    get(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.intranetNoticeService.get(+req.params.id);
        return res.status(200).json(result);
    }

    @Delete('/:id')
    remove(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.intranetNoticeService.remove(+req.params.id);
        return res.status(200).json(result);
    }

    @Post('/')
    add(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.intranetNoticeService.add({
            title: req.body.title.toString(),
            content: req.body.content.toString(),
            attachment: req.body.attachment
        });
        return res.status(200).json(result);
    }
}