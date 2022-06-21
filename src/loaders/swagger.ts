import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from '../modules/readFile';

export default async (app: Express) => {
    const swaggerDocument = readFileSync(__dirname + '/../../swagger.json');
    if (swaggerDocument) {
        app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(JSON.parse(swaggerDocument))
        );
    }
};
