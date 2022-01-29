import { createConnection } from 'typeorm';

export default async () => {
    await createConnection()
        .then(() => {
            console.log('Database Connected!');
        })
        .catch((error) => console.error(error));
};
