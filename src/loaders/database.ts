import { Container } from '@decorators/di';
import { createConnection } from 'typeorm';
import {
    AttachmentEntity,
    IntranetNoticeEntity,
    MealEntity,
    ScheduleEntity,
    SchoolNoticeEntity,
    UserEntity,
    UserScheduleEntity,
} from '../entities';
import { ClubInfoEntity } from '../entities/ClubInfo';
import logger from '../modules/logger';

export default async () => {
    await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [
            AttachmentEntity,
            ClubInfoEntity,
            MealEntity,
            IntranetNoticeEntity,
            ScheduleEntity,
            SchoolNoticeEntity,
            UserEntity,
            UserScheduleEntity,
        ],
        migrations: [],
        subscribers: [],
    })
        .then((connection) => {
            Container.provide([
                {
                    provide: UserEntity,
                    useValue: connection.getRepository(UserEntity),
                },
                {
                    provide: AttachmentEntity,
                    useValue: connection.getRepository(AttachmentEntity),
                },
                {
                    provide: ClubInfoEntity,
                    useValue: connection.getRepository(ClubInfoEntity),
                },
                {
                    provide: ScheduleEntity,
                    useValue: connection.getRepository(ScheduleEntity),
                },
                {
                    provide: UserScheduleEntity,
                    useValue: connection.getRepository(UserScheduleEntity),
                },
                {
                    provide: SchoolNoticeEntity,
                    useValue: connection.getRepository(SchoolNoticeEntity),
                },
                {
                    provide: IntranetNoticeEntity,
                    useValue: connection.getRepository(IntranetNoticeEntity),
                },
                {
                    provide: MealEntity,
                    useValue: connection.getRepository(MealEntity),
                },
            ]);
            logger.log('Database Connected!');
        })
        .catch((error) => logger.error(error));
};
