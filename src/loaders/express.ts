import { Request, Response, Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { isProduction } from '../constants';

export default async (app: Express) => {
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
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.get('/', (_req: Request, res: Response) => {
        res.status(200).json('hello');
    });
};
