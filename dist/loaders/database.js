"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@decorators/di");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const ClubInfo_1 = require("../entities/ClubInfo");
const logger_1 = __importDefault(require("../modules/logger"));
exports.default = async () => {
    await (0, typeorm_1.createConnection)({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [
            entities_1.AttachmentEntity,
            ClubInfo_1.ClubInfoEntity,
            entities_1.MealEntity,
            entities_1.IntranetNoticeEntity,
            entities_1.ScheduleEntity,
            entities_1.SchoolNoticeEntity,
            entities_1.UserEntity,
            entities_1.UserScheduleEntity,
        ],
        migrations: [],
        subscribers: [],
    })
        .then((connection) => {
        di_1.Container.provide([
            {
                provide: entities_1.UserEntity,
                useValue: connection.getRepository(entities_1.UserEntity),
            },
            {
                provide: entities_1.AttachmentEntity,
                useValue: connection.getRepository(entities_1.AttachmentEntity),
            },
            {
                provide: ClubInfo_1.ClubInfoEntity,
                useValue: connection.getRepository(ClubInfo_1.ClubInfoEntity),
            },
            {
                provide: entities_1.ScheduleEntity,
                useValue: connection.getRepository(entities_1.ScheduleEntity),
            },
            {
                provide: entities_1.UserScheduleEntity,
                useValue: connection.getRepository(entities_1.UserScheduleEntity),
            },
            {
                provide: entities_1.SchoolNoticeEntity,
                useValue: connection.getRepository(entities_1.SchoolNoticeEntity),
            },
            {
                provide: entities_1.IntranetNoticeEntity,
                useValue: connection.getRepository(entities_1.IntranetNoticeEntity),
            },
            {
                provide: entities_1.MealEntity,
                useValue: connection.getRepository(entities_1.MealEntity),
            },
        ]);
        logger_1.default.log('Database Connected!');
    })
        .catch((error) => logger_1.default.error(error));
};
//# sourceMappingURL=database.js.map