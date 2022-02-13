import { Express } from 'express';
import expressLoader from './express';
import databaseLoader from './database';
import sessionLoader from './session';
import routeLoader from './route';
import neisSyncer from './neisSyncer';

export default async ({ app }: { app: Express }) => {
    await databaseLoader();
    await expressLoader(app);
    await sessionLoader(app);
    await routeLoader(app);
    await neisSyncer(60 * 60);
};
