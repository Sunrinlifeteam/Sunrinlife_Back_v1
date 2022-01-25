import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import dotenv from "dotenv";
dotenv.config();

createConnection()
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => console.error(error));

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(morgan('common'));

app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.DB_PORT)
    console.log('Server is listening port 3000!');
});
