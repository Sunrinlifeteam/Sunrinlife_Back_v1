import express from 'express';
import dotenv from 'dotenv';

async function bootstrap() {
    const app = express();
    dotenv.config();
    await require('./loaders').default({ app });
    app.listen(app.get('port'), () => {
        console.log(`Server is listening port ${app.get('port')}.`);
    });
}

bootstrap();
