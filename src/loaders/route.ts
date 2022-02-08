import express from 'express';
import { attachControllers } from '@decorators/express';
import { AuthController } from '../controllers/auth';
import { ScheduleController } from '../controllers/schedule';
import { SchoolNoticeController } from '../controllers/schoolNotice';
import { IntranetNoticeController } from '../controllers/intranetNotice';

export default async (app: express.Application) => {
    attachControllers(app, [AuthController]);
    attachControllers(app, [ScheduleController]);
    attachControllers(app, [IntranetNoticeController, SchoolNoticeController]);
};