import { createConnection } from 'typeorm';
import entities from '../entities';
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
        entities: entities,
        migrations: [],
        subscribers: [],
    })
        .then(() => {
            logger.log('Database Connected!');
        })
        .catch((error) => logger.error(error));
};
