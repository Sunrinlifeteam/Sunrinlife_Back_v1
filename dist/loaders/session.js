"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const logger_1 = __importDefault(require("../modules/logger"));
const MySQLStore = require('express-mysql-session')(express_session_1.default);
exports.default = async (app) => {
    if (process.env.SESSION_SECRET == undefined) {
        logger_1.default.error('SESSION_SECRET environment is empty.');
        return;
    }
    var sessionStore = new MySQLStore({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    }));
};
//# sourceMappingURL=session.js.map