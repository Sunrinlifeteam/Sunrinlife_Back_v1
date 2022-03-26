import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { isProduction } from '../constants';

export default async (app: Express) => {
    app.set('service_port', process.env.PORT || 3000);
    if (isProduction) {
        app.use(helmet());
    }
    app.use(morgan(isProduction ? 'combined' : 'dev'));
    app.use(
        cors({
            origin: isProduction ? process.env.FRONTEND_URL : '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        })
    );
    app.use(express.json({ limit: '16mb' }));
    app.use(
        express.urlencoded({
            extended: false,
        })
    );
    app.use(cookieParser());
    app.get('/', (_req: Request, res: Response) => {
        res.status(200).json('hello');
    });
};
