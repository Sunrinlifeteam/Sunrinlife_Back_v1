import { Inject, Injectable } from '@decorators/di';
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
import {
    AnonymousBoardService,
    AbstractBoardService,
    NamedBoardService,
} from '../services/board';
import * as Board from '../types/board';
import { updateValidator, writeValidator } from '../validators/board';

export class BoardController<Service extends AbstractBoardService> {
    constructor(private readonly service: Service) {}

    async count(
        req: _Request,
        res: _Response,
        title?: string,
        content?: string
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

    async isLiked(req: _Request, res: _Response, id: number) {
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

    async recommend(req: _Request, res: _Response, id: number) {
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

    async hotsunrin(req: _Request, res: _Response) {
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

    async list(
        req: _Request,
        res: _Response,
        offset: number = 0,
        count: number = 25,
        sort: 'ASC' | 'DESC' = 'DESC',
        title?: string,
        content?: string,
        orderType: 'created' | 'updated' = 'created'
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        try {
            console.log(req.user);
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

    async getOne(req: _Request, res: _Response, id: number) {
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

    async write(req: _Request, res: _Response, body: Board.Body) {
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

    async update(
        req: _Request,
        res: _Response,
        id: number,
        body: Partial<Board.Body>
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

    async delete(req: _Request, res: _Response, id: number) {
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

@Controller('/board/named')
@Injectable()
export class NamedBoardController extends BoardController<NamedBoardService> {
    constructor(@Inject(NamedBoardService) service: NamedBoardService) {
        super(service);
    }

    @Get('/count', [accessTokenGuard])
    override async count(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('title') title?: string,
        @Query('content') content?: string
    ) {
        super.count(req, res, title, content);
    }

    @Get('/:id/like', [accessTokenGuard])
    override async isLiked(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.isLiked(req, res, id);
    }

    @Post('/:id/like', [accessTokenGuard])
    override async recommend(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.recommend(req, res, id);
    }

    @Get('/top', [accessTokenGuard])
    override async hotsunrin(
        @Request() req: _Request,
        @Response() res: _Response
    ) {
        super.hotsunrin(req, res);
    }

    @Get('/', [accessTokenGuard])
    override async list(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('offset') offset: number = 0,
        @Query('count') count: number = 25,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
        @Query('title') title?: string,
        @Query('content') content?: string,
        @Query('order') orderType: 'created' | 'updated' = 'created'
    ) {
        super.list(req, res, offset, count, sort, title, content, orderType);
    }

    @Get('/:id', [accessTokenGuard])
    override async getOne(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.getOne(req, res, id);
    }

    @Post('/', [accessTokenGuard, celebrate(writeValidator)])
    override async write(
        @Request() req: _Request,
        @Response() res: _Response,
        @Body() body: Board.Body
    ) {
        super.write(req, res, body);
    }

    @Put('/:id', [accessTokenGuard, celebrate(updateValidator)])
    override async update(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number,
        @Body() body: Partial<Board.Body>
    ) {
        super.update(req, res, id, body);
    }

    @Delete('/:id', [accessTokenGuard])
    override async delete(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.delete(req, res, id);
    }
}

@Controller('/board/anonymous')
@Injectable()
export class AnonymousBoardController extends BoardController<AnonymousBoardService> {
    constructor(@Inject(AnonymousBoardService) service: AnonymousBoardService) {
        super(service);
    }

    @Get('/count', [accessTokenGuard])
    override async count(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('title') title?: string,
        @Query('content') content?: string
    ) {
        super.count(req, res, title, content);
    }

    @Get('/:id/like', [accessTokenGuard])
    override async isLiked(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.isLiked(req, res, id);
    }

    @Post('/:id/like', [accessTokenGuard])
    override async recommend(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.recommend(req, res, id);
    }

    @Get('/top', [accessTokenGuard])
    override async hotsunrin(
        @Request() req: _Request,
        @Response() res: _Response
    ) {
        super.hotsunrin(req, res);
    }

    @Get('/', [accessTokenGuard])
    override async list(
        @Request() req: _Request,
        @Response() res: _Response,
        @Query('offset') offset: number = 0,
        @Query('count') count: number = 25,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
        @Query('title') title?: string,
        @Query('content') content?: string,
        @Query('order') orderType: 'created' | 'updated' = 'created'
    ) {
        super.list(req, res, offset, count, sort, title, content, orderType);
    }

    @Get('/:id', [accessTokenGuard])
    override async getOne(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.getOne(req, res, id);
    }

    @Post('/', [accessTokenGuard, celebrate(writeValidator)])
    override async write(
        @Request() req: _Request,
        @Response() res: _Response,
        @Body() body: Board.Body
    ) {
        super.write(req, res, body);
    }

    @Put('/:id', [accessTokenGuard, celebrate(updateValidator)])
    override async update(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number,
        @Body() body: Partial<Board.Body>
    ) {
        super.update(req, res, id, body);
    }

    @Delete('/:id', [accessTokenGuard])
    override async delete(
        @Request() req: _Request,
        @Response() res: _Response,
        @Params('id') id: number
    ) {
        super.delete(req, res, id);
    }
}
