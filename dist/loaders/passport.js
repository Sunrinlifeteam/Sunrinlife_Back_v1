"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_jwt_1 = require("passport-jwt");
const passport_custom_1 = require("passport-custom");
const passport_2 = require("../modules/passport");
exports.default = async (app) => {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.serializeUser((user, done) => done(null, user));
    passport_1.default.deserializeUser((user, done) => done(null, user));
    passport_1.default.use('google', new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, passport_2.googleOAuthHandler));
    passport_1.default.use('jwt', new passport_jwt_1.Strategy(passport_2.jwtConfig, passport_2.jwtVerify));
    passport_1.default.use('jwt-refresh', new passport_custom_1.Strategy(passport_2.jwtRefreshVerify));
};
//# sourceMappingURL=passport.js.map