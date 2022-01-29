import { Express } from 'express';
import expressLoader from './express';
import databaseLoader from './database';

export default async ({ app }: { app: Express }) => {
    await databaseLoader();
    await expressLoader({ app });
};
