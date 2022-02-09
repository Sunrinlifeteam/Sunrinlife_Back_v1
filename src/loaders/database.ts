import { createConnection } from 'typeorm';
import logger from '../modules/logger';

export default async () => {
    await createConnection()
        .then(() => {
            logger.log('Database Connected!');
        })
        .catch((error) => logger.error(error));
};
