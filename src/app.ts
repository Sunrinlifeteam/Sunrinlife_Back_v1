import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import cors from 'cors';

class App {
    app: express.Application;
    constructor() {
        this.app = express();
        this.initConfig();
        this.initAndConnectDB();
        this.initPort();
        this.initMiddlewares();
        this.initRouter();
    }

    initConfig() {
        dotenv.config();
    }
    initAndConnectDB() {
        createConnection()
            .then(() => {
                console.log('Database Connected!');
            })
            .catch((error) => console.error(error));
    }

    initRouter() {}
    initPort() {
        this.app.set('port', process.env.PORT || 3000);
    }
    initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );
        this.app.use(
            morgan(process.env.NODE_ENV == 'production' ? 'combined' : 'dev')
        );
        this.app.use(
            cors({
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true,
            })
        );
    }
}
export default App;
