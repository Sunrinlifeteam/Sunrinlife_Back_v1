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
import { ISchoolNoticePut } from '../types/schoolNotice';
import { SchoolNoticeService } from '../services/schoolNotice';
import { schoolNoticeValidator } from '../validators/schoolNotice';
import { SchoolNoticeEntity } from '../entities';

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
        const result = this.schoolNoticeService.get(parseInt(req.params.id));
        return res.status(200).json(result);
    }

    @Delete('/:id')
    remove(@Request() req: IRequest, @Response() res: IResponse) {
        const result = this.schoolNoticeService.remove(parseInt(req.params.id));
        return res.status(200).json(result);
    }

    @Put('/:id', [celebrate(schoolNoticeValidator)] as any[])
    edit(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Body() body: ISchoolNoticePut
    ) {
        const result = this.schoolNoticeService.edit(
            Object.assign({ id: parseInt(req.params.id) }, body)
        );
        return res.status(200).json(result);
    }

    @Post('/', [celebrate(schoolNoticeValidator)] as any[])
    add(@Response() res: IResponse, @Body() body: SchoolNoticeEntity) {
        const result = this.schoolNoticeService.add(body);
        return res.status(200).json(result);
    }
}
