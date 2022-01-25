"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
typeorm_1.createConnection()
    .then(() => {
    console.log('Database Connected');
})
    .catch((error) => console.error(error));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
app.use(morgan_1.default('common'));
app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.DB_PORT);
    console.log('Server is listening port 3000!');
});
//# sourceMappingURL=main.js.map