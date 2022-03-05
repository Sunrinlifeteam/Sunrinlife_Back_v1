import express from 'express';
import { attachControllers } from '@decorators/express';
import { AuthController } from '../controllers/auth';
import { UserScheduleController } from '../controllers/userSchedule';
import { SchoolNoticeController } from '../controllers/schoolNotice';
import { IntranetNoticeController } from '../controllers/intranetNotice';
import { UploadController } from '../controllers/upload';
import { ScheduleController } from '../controllers/schedule';

export default async (app: express.Application) => {
    attachControllers(app, [UploadController]);
    attachControllers(app, [AuthController]);
    attachControllers(app, [UserScheduleController, ScheduleController]);
    attachControllers(app, [IntranetNoticeController, SchoolNoticeController]);
};
