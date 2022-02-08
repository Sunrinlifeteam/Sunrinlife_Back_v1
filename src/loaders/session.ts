import 'dotenv/config';
import { Express } from 'express';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

export default async (app: Express) => {
    if (process.env.SESSION_SECRET == undefined) {
        console.error('SESSION_SECRET environment is empty.');
        return;
    }
    var sessionStore = new MySQLStore({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            store: sessionStore,
        })
    );
};
