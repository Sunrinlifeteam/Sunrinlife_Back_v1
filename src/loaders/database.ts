import { Container } from '@decorators/di';
import { createConnection } from 'typeorm';
import {
    AttachmentEntity,
    MealEntity,
    ScheduleEntity,
    UserEntity,
    UserScheduleEntity,
    NoticeEntity,
    ClubInfoEntity,
    BoardEntity,
    NamedBoardEntity,
    AnonymousBoardEntity,
    TimeTableEntity,
    WeekTimeTableEntity,
} from '../entities';
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
        logging: process.env.DB_LOGGING === 'true',
        entities: [
            AttachmentEntity,
            ClubInfoEntity,
            MealEntity,
            ScheduleEntity,
            UserEntity,
            UserScheduleEntity,
            NoticeEntity,
            NamedBoardEntity,
            AnonymousBoardEntity,
            TimeTableEntity,
            WeekTimeTableEntity,
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
                    provide: NoticeEntity,
                    useValue: connection.getRepository(NoticeEntity),
                },
                {
                    provide: MealEntity,
                    useValue: connection.getRepository(MealEntity),
                },
                {
                    provide: NamedBoardEntity,
                    useValue: connection.getRepository(NamedBoardEntity),
                },
                {
                    provide: AnonymousBoardEntity,
                    useValue: connection.getRepository(AnonymousBoardEntity),
                },
                {
                    provide: TimeTableEntity,
                    useValue: connection.getRepository(TimeTableEntity),
                },
                {
                    provide: WeekTimeTableEntity,
                    useValue: connection.getRepository(WeekTimeTableEntity),
                },
            ]);
            logger.log('Database Connected!');
        })
        .catch((error) => logger.error(error));
};
