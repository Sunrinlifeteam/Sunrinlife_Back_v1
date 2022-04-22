import { Injectable } from '@decorators/di';
import {
    Body,
    Controller,
    Delete,
    Get,
    Params,
    Post,
    Put,
    Query,
    Request,
    Response,
} from '@decorators/express';
import { celebrate } from 'celebrate';
import { Request as _Request, Response as _Response } from 'express';
import HttpStatusCode from '../constants/HttpStatusCode';
import { ErrorHandler } from '../modules/ErrorHandler';
import { accessTokenGuard } from '../modules/passport';
import { BoardService } from '../services/board';
import * as Board from '../types/board';
import { updateValidator, writeValidator } from '../validators/board';

@Controller('/board')
@Controller('/community')
@Injectable()
export class BoardController {
    constructor(private readonly service: BoardService) {}

    @Get('/', [accessTokenGuard])
    async list(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('offset') offset: number = 0,
        @Query('count') count: number = 25,
        @Query('type') type?: Board.Type,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
        @Query('title') title?: string,
        @Query('content') content?: string,
        @Query('order') orderType: 'created' | 'updated' = 'created'
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service
            .find({
                range: {
                    offset,
                    count,
                },
                sort,
                orderType,
                title,
                content,
                type,
            })
            .catch(() => res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR));
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Post('/', [accessTokenGuard, celebrate(writeValidator)])
    async write(
        @Request() req: _Request,
        @Response() res: _Response,
        @Body() body: Board.Body
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service
            .write(req.user, body)
            .catch(() => res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR));
        return res.status(HttpStatusCode.CREATED).json(result);
    }

    @Put('/:id', [accessTokenGuard, celebrate(updateValidator)])
    async update(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number,
        @Body() body: Partial<Board.Body>
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service
            .update(req.user, id, body)
            .catch(() => res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR));
        return res.sendStatus(HttpStatusCode.NO_CONTENT);
    }

    @Delete('/:id', [accessTokenGuard])
    async delete(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service
            .delete(req.user, id)
            .catch(() => res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR));
        return res.sendStatus(HttpStatusCode.NO_CONTENT);
    }
}
