import { Express } from 'express';
import expressLoader from './express';
import databaseLoader from './database';
import sessionLoader from './session';
import routeLoader from './route';
import neisSyncer from './neisSyncer';
import passportLoader from './passport';
import environmentChecker from './environment';
import filesystem from './filesystem';

export default async ({ app }: { app: Express }) => {
    await environmentChecker();
    await filesystem();
    await databaseLoader();
    await expressLoader(app);
    await sessionLoader(app);
    await passportLoader(app);
    await routeLoader(app);
    await neisSyncer(60 * 60);
};
