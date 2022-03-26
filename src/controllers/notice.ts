import { Request as IRequest, Response as IResponse } from 'express';
import {
    Request,
    Response,
    Controller,
    Get,
    Body,
    Post,
    Delete,
    Params,
    Put,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { NoticeService } from '../services/notice';
import { IWriteNoticeBody } from '../types/notice';
import HttpStatusCode from '../constants/HttpStatusCode';
import { celebrate } from 'celebrate';
import { writeValidator } from '../validators/notice';

@Controller('/notice')
@Injectable()
export class NoticeController {
    constructor(private readonly service: NoticeService) {
        logger.log('NoticeController Attached!');
    }

    @Get('/')
    async list(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('type') type: 'notice' | 'intranet' | 'all' = 'all',
        @Params('page') page: number = 1,
        @Params('count') count: number = 5,
        @Params('sort') sort: 'old' | 'new' = 'new'
    ) {
        const result = await this.service.list({
            type: type,
            page: page,
            count: count,
            sort: sort,
        });
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Post('/')
    async write(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Body() body: IWriteNoticeBody
    ) {
        const result = await this.service.write(body);
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Put('/:id')
    async update(
        @Request() req: IRequest,
        @Response() res : IResponse,
        @Params('id') id: number,
        @Body() body: IWriteNoticeBody
    ) {
        const result = await this.service.update(id,body);
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Delete('/:id')
    async delete(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: number
    ) {
        const result = await this.service.delete(id);
        return res.status(HttpStatusCode.OK).json(result);
    }
}