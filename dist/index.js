"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
async function bootstrap() {
    const app = (0, express_1.default)();
    dotenv_1.default.config();
    await require('./loaders').default({ app });
    app.listen(app.get('service_port'), () => {
        console.log(`Server is listening port ${app.get('service_port')}.`);
    });
}
bootstrap();
//# sourceMappingURL=index.js.map