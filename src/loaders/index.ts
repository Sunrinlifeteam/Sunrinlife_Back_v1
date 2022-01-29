import express from 'express';
import expressLoader from './express';
import databaseLoader from './database';

export default async ({ app }: { app: express.Application }) => {
    await databaseLoader();
    await expressLoader({ app });
};
