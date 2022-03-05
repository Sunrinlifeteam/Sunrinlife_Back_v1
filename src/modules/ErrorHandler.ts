import { Response } from 'express';
import HttpStatusCode from '../constants/HttpStatusCode';
import logger from './logger';

export function ErrorHandler(error: Error, res: Response) {
    logger.error(error.stack);
    return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
}
