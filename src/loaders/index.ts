import { Express } from 'express';
import expressLoader from './express';
import databaseLoader from './database';
import sessionLoader from './session';
import routeLoader from './route';

export default async ({ app }: { app: Express }) => {
    await databaseLoader();
    await expressLoader(app);
    await sessionLoader(app);
    await routeLoader(app);
};
