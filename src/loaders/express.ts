import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

export default async (app: Express) => {
    const isProduction = process.env.NODE_ENV === 'production';

    app.set('port', process.env.PORT || 3000);
    if (isProduction) {
        app.use(helmet());
    }
    app.use(morgan(isProduction ? 'combined' : 'dev'));
    app.use(
        cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: false,
        })
    );

    app.get('/', (_req: Request, res: Response) => {
        res.status(200).json('hello');
    });
};
