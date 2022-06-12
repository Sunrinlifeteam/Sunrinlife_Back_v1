import express from 'express';
import { attachControllers } from '@decorators/express';
import { AuthController } from '../controllers/auth';
import { UserScheduleController } from '../controllers/userSchedule';
import { UploadController } from '../controllers/upload';
import { ScheduleController } from '../controllers/schedule';
import { ClubInfoController } from '../controllers/clubInfo';
import { NoticeController } from '../controllers/notice';
import { UserController } from '../controllers/user';
import { TimeTableController } from '../controllers/timeTable';
import {
    AnonymousBoardController,
    NamedBoardController,
} from '../controllers/board';

export default async (app: express.Application) => {
    attachControllers(app, [UploadController]);
    attachControllers(app, [AuthController]);
    attachControllers(app, [UserController]);
    attachControllers(app, [UserScheduleController, ScheduleController]);
    attachControllers(app, [NoticeController]);
    attachControllers(app, [ClubInfoController]);
    attachControllers(app, [NamedBoardController, AnonymousBoardController]);
    attachControllers(app, [TimeTableController]);
};
