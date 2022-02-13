import express from 'express';
import { attachControllers } from '@decorators/express';
import { AuthController } from '../controllers/auth';
import { MyScheduleController } from '../controllers/mySchedule';
import { SchoolNoticeController } from '../controllers/schoolNotice';
import { IntranetNoticeController } from '../controllers/intranetNotice';
import { UploadController } from '../controllers/upload';
import { ScheduleController } from '../controllers/schedule';

export default async (app: express.Application) => {
    attachControllers(app, [UploadController]);
    attachControllers(app, [AuthController]);
    attachControllers(app, [MyScheduleController, ScheduleController]);
    attachControllers(app, [IntranetNoticeController, SchoolNoticeController]);
};
