import { Response as IResponse, Request as IRequest } from 'express';
import {
    Response,
    Request,
    Controller,
    Get,
    Post,
    Delete,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { SchoolNoticeService } from '../services/schoolNotice';

@Controller('/notice/school')
@Injectable()
export class SchoolNoticeController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly schoolNoticeService: SchoolNoticeService) {}

    @Get('/list')
    list(@Response() res: IResponse) {
        const result = this.schoolNoticeService.list();
        return res.status(200).json(result);
    }

    @Get('/:id')
    get(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.schoolNoticeService.get(+req.params.id);
        return res.status(200).json(result);
    }

    @Delete('/:id')
    remove(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.schoolNoticeService.remove(+req.params.id);
        return res.status(200).json(result);
    }

    @Post('/')
    add(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.schoolNoticeService.add({
            title: req.body.title.toString(),
            content: req.body.content.toString(),
            attachment: req.body.attachment,
        });
        return res.status(200).json(result);
    }
}
