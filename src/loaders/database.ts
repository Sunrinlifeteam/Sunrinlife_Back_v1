import { Container } from '@decorators/di';
import { createConnection } from 'typeorm';
import entities from '../entities';
import { User } from '../entities/User';
import { ClubInfoData } from '../entities/ClubInfo';
import logger from '../modules/logger';
import { Schedule } from '../entities/Schedule';
import { UserSchedule } from '../entities/UserSchedule';

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
        entities,
        migrations: [],
        subscribers: [],
    })
        .then((connection) => {
            Container.provide([
                { provide: User, useValue: connection.getRepository(User) },
                {
                    provide: ClubInfoData,
                    useValue: connection.getRepository(ClubInfoData),
                },
                { provide: Schedule, useValue: connection.getRepository(Schedule) },
                { provide: UserSchedule, useValue: connection.getRepository(UserSchedule) },
            ]);
            logger.log('Database Connected!');
        })
        .catch((error) => logger.error(error));
};
