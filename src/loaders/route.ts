import express from 'express';
import { attachControllers } from '@decorators/express';
import { AuthController } from '../controllers/auth';
import { UserScheduleController } from '../controllers/userSchedule';
import { UploadController } from '../controllers/upload';
import { ScheduleController } from '../controllers/schedule';
import { ClubInfoController } from '../controllers/clubInfo';
import { NoticeController } from '../controllers/notice';

export default async (app: express.Application) => {
    attachControllers(app, [UploadController]);
    attachControllers(app, [AuthController]);
    attachControllers(app, [UserScheduleController, ScheduleController]);
    attachControllers(app, [NoticeController]);
    attachControllers(app, [ClubInfoController]);
};
