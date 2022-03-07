import { Response as IResponse, Request as IRequest } from 'express';
import {
    Response,
    Request,
    Controller,
    Get,
    Post,
    Delete,
    Put,
    Body,
} from '@decorators/express';
import { celebrate } from 'celebrate';
import { Injectable } from '@decorators/di';
import { INoticeBody } from '../models/intranetNotice';
import { IntranetNoticeService } from '../services/intranetNotice';
import { intranetNoticeValidator } from '../validators/intranetNotice';
import { IntranetNoticeEntity } from '../entities';

@Controller('/notice/intranet')
@Injectable()
export class IntranetNoticeController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private readonly intranetNoticeService: IntranetNoticeService
    ) {}

    @Get('/list')
    list(@Response() res: IResponse) {
        const result = this.intranetNoticeService.list();
        return res.status(200).json(result);
    }

    @Get('/:id')
    get(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.intranetNoticeService.get(parseInt(req.params.id));
        return res.status(200).json(result);
    }

    @Delete('/:id')
    remove(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.intranetNoticeService.remove(
            parseInt(req.params.id)
        );
        return res.status(200).json(result);
    }

    @Put('/:id', [celebrate(intranetNoticeValidator)] as any[])
    edit(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Body() body: INoticeBody
    ) {
        const result = this.intranetNoticeService.edit(
            Object.assign({ id: parseInt(req.params.id) }, body)
        );
        return res.status(200).json(result);
    }

    @Post('/', [celebrate(intranetNoticeValidator)] as any[])
    add(@Response() res: IResponse, @Body() body: IntranetNoticeEntity) {
        const result = this.intranetNoticeService.add(body);
        return res.status(200).json(result);
    }
}
