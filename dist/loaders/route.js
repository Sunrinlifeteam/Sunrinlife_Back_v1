"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@decorators/express");
const auth_1 = require("../controllers/auth");
const userSchedule_1 = require("../controllers/userSchedule");
const schoolNotice_1 = require("../controllers/schoolNotice");
const intranetNotice_1 = require("../controllers/intranetNotice");
const upload_1 = require("../controllers/upload");
const schedule_1 = require("../controllers/schedule");
const clubInfo_1 = require("../controllers/clubInfo");
exports.default = async (app) => {
    (0, express_1.attachControllers)(app, [upload_1.UploadController]);
    (0, express_1.attachControllers)(app, [auth_1.AuthController]);
    (0, express_1.attachControllers)(app, [userSchedule_1.UserScheduleController, schedule_1.ScheduleController]);
    (0, express_1.attachControllers)(app, [intranetNotice_1.IntranetNoticeController, schoolNotice_1.SchoolNoticeController]);
    (0, express_1.attachControllers)(app, [clubInfo_1.ClubInfoController]);
};
//# sourceMappingURL=route.js.map