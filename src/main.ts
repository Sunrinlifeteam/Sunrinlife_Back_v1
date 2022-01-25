import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(morgan('common'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening port 3000!');
});
