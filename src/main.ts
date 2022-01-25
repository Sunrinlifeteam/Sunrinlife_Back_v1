import express, {Request, Response, NextFunction} from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("common"));


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening port 3000!");
});