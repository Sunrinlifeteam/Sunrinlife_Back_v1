import express from 'express';
import dotenv from 'dotenv';
import loaders from './loaders';

async function bootstrap() {
    const app = express();
    dotenv.config();
    await loaders({ app });
    app.listen(app.get('service_port'), () => {
        console.log(`Server is listening port ${app.get('service_port')}.`);
    });
}

bootstrap();
