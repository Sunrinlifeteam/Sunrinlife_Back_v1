"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_COOKIE_KEY = exports.REFRESH_TOKEN_COOKIE_OPTION = void 0;
const isProduction_1 = require("./isProduction");
exports.REFRESH_TOKEN_COOKIE_OPTION = {
    ...(isProduction_1.isProduction ? { domain: process.env.SERVICE_DOMAIN } : {}),
    httpOnly: isProduction_1.isProduction,
    secure: isProduction_1.isProduction,
    maxAge: 2592000000,
};
exports.REFRESH_TOKEN_COOKIE_KEY = 'Refresh';
//# sourceMappingURL=cookieOption.js.map