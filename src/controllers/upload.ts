import { Request as IRequest, Response as IResponse } from 'express';
import {
    Request,
    Response,
    Controller,
    Get,
    Post,
    Body,
    Params,
    Delete,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import logger from '../modules/logger';
import { UploadService } from '../services/upload';
import { UploadBody } from '../types/upload';
import upload from '../modules/upload';
import HttpStatusCode from '../constants/HttpStatusCode';
import { celebrate } from 'celebrate';
import { uploadValidator } from '../validators/upload';
import { createReadStream } from 'fs';
import { accessTokenGuard } from '../modules/passport';
import { User } from '../entities/User';
import { ErrorHandler } from '../modules/ErrorHandler';

@Controller('/upload')
@Injectable()
export class UploadController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly uploadService: UploadService) {
        logger.log('UploadController Attached!');
    }

    private LogError(functionName: string, errorMessage: string) {
        logger.error(
            'Error on\n',
            '\tcontrollers.upload.ts\n',
            `\tUploadController.${functionName}\n`,
            errorMessage
                .split('\n')
                .map((x) => `-${x}`)
                .join('\n')
        );
    }

    @Get('/')
    async Get(@Response() res: IResponse) {
        const result = await this.uploadService.list();
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Get('/:id')
    async GetById(@Response() res: IResponse, @Params('id') id: number) {
        const result = await this.uploadService.info(id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode.NOT_FOUND);
        return res.status(HttpStatusCode.OK).json(result);
    }

    @Get('/download/:id')
    async DownloadById(@Response() res: IResponse, @Params('id') id: number) {
        const result = await this.uploadService.info(id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode.NOT_FOUND);
        return res.status(HttpStatusCode.OK).download(result.getPath());
    }

    @Get('/view/:id')
    async ViewById(@Response() res: IResponse, @Params('id') id: number) {
        const result = await this.uploadService.info(id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode.NOT_FOUND);
        res.status(HttpStatusCode.OK).header('Content-Type', result.mimetype);
        return createReadStream(result.getPath()).pipe(res);
    }

    @Delete('/:id', [accessTokenGuard])
    async DeleteById(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Params('id') id: number
    ) {
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.uploadService.delete(req.user, id);
        if (result == undefined)
            return res.sendStatus(HttpStatusCode.NOT_FOUND);
        return res.status(HttpStatusCode.NO_CONTENT);
    }

    @Post('/', [
        accessTokenGuard,
        upload.single('file'),
        celebrate(uploadValidator),
    ] as any[])
    async Post(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Body() body: UploadBody
    ) {
        if (req.file == undefined)
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json({ message: 'Need a file to upload' });
        if (!req.user)
            return ErrorHandler(new TypeError('req.user is undefined'), res);
        const result = await this.uploadService.upload(
            req.user,
            req.file,
            body
        );
        return res.status(HttpStatusCode.CREATED).json(result);
    }
}
