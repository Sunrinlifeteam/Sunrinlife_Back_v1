"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const constants_1 = require("../constants");
exports.default = async (app) => {
    app.set('service_port', process.env.PORT || 3000);
    if (constants_1.isProduction) {
        app.use((0, helmet_1.default)());
    }
    app.use((0, morgan_1.default)(constants_1.isProduction ? 'combined' : 'dev'));
    app.use((0, cors_1.default)({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({
        extended: false,
    }));
    app.use((0, cookie_parser_1.default)());
    app.get('/', (_req, res) => {
        res.status(200).json('hello');
    });
};
//# sourceMappingURL=express.js.map