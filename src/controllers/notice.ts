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
    Query
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { NoticeService } from '../services/notice';
import { IWriteNoticeBody } from '../types/notice';
import HttpStatusCode from '../constants/HttpStatusCode';
import { celebrate } from 'celebrate';
import { noticeWriteValidator } from '../validators/notice';

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
        @Query('type') type: 'school' | 'intranet' | 'all' = 'all',
        @Query('page') page: number = 1,
        @Query('count') count: number = 5,
        @Query('sort') sort: 'old' | 'new' = 'new',
        @Query('search') search: string = ''
    ) {
        const result = await this.service.list({
            type: type,
            page: page,
            count: count,
            sort: sort,
            search: search
        });
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Get('/:id')
    async get(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params() id: number
    ) {
        const result = await this.service.get(id);
        if(!result) return res.status(HttpStatusCode.BAD_REQUEST).send('result not found');
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