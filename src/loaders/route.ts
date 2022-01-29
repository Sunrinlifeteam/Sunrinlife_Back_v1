import express from 'express';
import { attachControllers } from '@decorators/express';
import { AuthController } from '../controllers/auth';

export default async (app: express.Application) => {
    attachControllers(app, [AuthController]);
};
