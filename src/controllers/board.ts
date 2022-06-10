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
import logger from '../modules/logger';
import { accessTokenGuard } from '../modules/passport';
import { AnonymousBoardService, NamedBoardService } from '../services/board';
import * as Board from '../types/board';
import { updateValidator, writeValidator } from '../validators/board';

@Controller('/board/named')
@Injectable()
export class NamedBoardController {
    constructor(private readonly service: NamedBoardService) {}

    @Get('/count', [accessTokenGuard])
    async count(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('title') title?: string,
        @Query('content') content?: string
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.count({
                title,
                content,
            });
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/:id/like', [accessTokenGuard])
    async isLiked(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.isLiked(req.user, id);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Post('/:id/like', [accessTokenGuard])
    async recommend(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.recommend(req.user, id);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/top', [accessTokenGuard])
    async hotsunrin(@Request() req: _Request, @Response() res: _Response) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.hotsunrin();
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/', [accessTokenGuard])
    async list(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('offset') offset: number = 0,
        @Query('count') count: number = 25,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
        @Query('title') title?: string,
        @Query('content') content?: string,
        @Query('order') orderType: 'created' | 'updated' = 'created'
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.find({
                range: {
                    offset,
                    count,
                },
                sort,
                orderType,
                title,
                content,
            });
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/:id', [accessTokenGuard])
    async getOne(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.findById(id);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Post('/', [accessTokenGuard, celebrate(writeValidator)])
    async write(
        @Request() req: _Request,
        @Response() res: _Response,
        @Body() body: Board.Body
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.write(req.user, body);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
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
        try {
            const result = await this.service.update(req.user, id, body);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Delete('/:id', [accessTokenGuard])
    async delete(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.delete(req.user, id);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }
}

@Controller('/board/anonymous')
@Injectable()
export class AnonymousBoardController {
    constructor(private readonly service: AnonymousBoardService) {}

    @Get('/count', [accessTokenGuard])
    async count(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('title') title?: string,
        @Query('content') content?: string
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.count({
                title,
                content,
            });
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/:id/like', [accessTokenGuard])
    async recommend(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.recommend(req.user, id);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/top', [accessTokenGuard])
    async hotsunrin(@Request() req: _Request, @Response() res: _Response) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.hotsunrin();
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/', [accessTokenGuard])
    async list(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('offset') offset: number = 0,
        @Query('count') count: number = 25,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
        @Query('title') title?: string,
        @Query('content') content?: string,
        @Query('order') orderType: 'created' | 'updated' = 'created'
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.find({
                range: {
                    offset,
                    count,
                },
                sort,
                orderType,
                title,
                content,
            });
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Get('/:id', [accessTokenGuard])
    async getOne(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.findById(id);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Post('/', [accessTokenGuard, celebrate(writeValidator)])
    async write(
        @Request() req: _Request,
        @Response() res: _Response,
        @Body() body: Board.Body
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.write(req.user, body);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
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
        try {
            const result = await this.service.update(req.user, id, body);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }

    @Delete('/:id', [accessTokenGuard])
    async delete(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            const result = await this.service.delete(req.user, id);
            return res.status(result.status).json(result.data).end();
        } catch (err) {
            logger.error(err);
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }
}
