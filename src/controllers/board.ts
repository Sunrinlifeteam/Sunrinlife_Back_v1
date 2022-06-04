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
@Injectable()
export class BoardController {
    constructor(private readonly service: BoardService) {}

    @Get('/count', [accessTokenGuard])
    async count(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('type') type?: Board.Type,
        @Query('title') title?: string,
        @Query('content') content?: string
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service
            .count({
                title,
                content,
                type,
            })
            .catch(
                (err) => (
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR),
                    console.log(err)
                )
            );
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Get('/:id/like', [accessTokenGuard])
    async recommend(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service
            .recommend(req.user.id, id)
            .catch(
                () => (err: any) => (
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR),
                    console.log(err)
                )
            );
        return res.sendStatus(HttpStatusCode.NO_CONTENT);
    }

    @Get('/top', [accessTokenGuard])
    async hotsunrin(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('type') type: Board.Type
    ) {
        const result = await this.service.hotsunrin(type).catch((err: any) => {
            res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
            console.log(err);
        });
        return res.status(HttpStatusCode.OK).json(result);
    }

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
            .catch(
                (err) => (
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR),
                    console.log(err)
                )
            );
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Get('/:id', [accessTokenGuard])
    async getOne(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.service
            .findById(id)
            .catch(
                () => (err: any) => (
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR),
                    console.log(err)
                )
            );
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
            .catch(
                () => (err: any) => (
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR),
                    console.log(err)
                )
            );
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
            .catch(
                () => (err: any) => (
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR),
                    console.log(err)
                )
            );
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
            .catch(
                () => (err: any) => (
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR),
                    console.log(err)
                )
            );
        return res.sendStatus(HttpStatusCode.NO_CONTENT);
    }
}
