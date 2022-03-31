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
    Query,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { NoticeService } from '../services/notice';
import { IWriteNoticeBody } from '../types/notice';
import HttpStatusCode from '../constants/HttpStatusCode';
import { celebrate } from 'celebrate';
import { noticeWriteValidator } from '../validators/notice';
import { accessTokenGuard } from '../modules/passport';
import { ErrorHandler } from '../modules/ErrorHandler';
import { ACCOUNT_TYPE, ROLE_FLAG } from '../constants';

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
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
        @Query('search') search: string = ''
    ) {
        const result = await this.service.list({
            type: type,
            page: page,
            count: count,
            sort: sort,
            search: search,
        });
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Get('/count')
    async count(
        @Response() res: IResponse,
        @Query('type') type: 'school' | 'intranet' | 'all' = 'all',
        @Query('search') search: string = ''
    ) {
        const result = await this.service.count({
            type,
            search,
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
        if (!result)
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .send('result not found');
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Post('/', [accessTokenGuard, celebrate(noticeWriteValidator)])
    async write(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Body() body: IWriteNoticeBody
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        if (!(req.user.role & ROLE_FLAG.ADMIN))
            return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        const result = await this.service.write(body);
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Put('/:id', [accessTokenGuard, celebrate(noticeWriteValidator)])
    async update(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: number,
        @Body() body: IWriteNoticeBody
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        if (!(req.user.role & ROLE_FLAG.ADMIN))
            return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        const result = await this.service.update(id, body);
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Delete('/:id', [accessTokenGuard])
    async delete(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        if (!(req.user.role & ROLE_FLAG.ADMIN))
            return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        logger.info(
            'Notice with id "',
            id,
            '"has been deleted by "',
            req.user.username,
            '".'
        );
        const result = await this.service.delete(id);
        return res.status(HttpStatusCode.OK).json(result);
    }
}
