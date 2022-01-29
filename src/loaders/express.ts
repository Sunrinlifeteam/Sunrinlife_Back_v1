import { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

export default async ({ app }: { app: Express }) => {
    const isProduction = process.env.NODE_ENV === 'production';

    app.set('port', process.env.PORT || 3000);

    app.get('/', (_req: Request, res: Response) => {
        res.status(200).json('hello');
    });

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
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
};
