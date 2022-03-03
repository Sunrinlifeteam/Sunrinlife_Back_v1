import { Express } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as CustomStrategy } from 'passport-custom';
import {
    jwtConfig,
    jwtVerify,
    googleOAuthHandler,
    jwtRefreshVerify,
} from '../modules/passport';

export default async (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user: any, done) => done(null, user));
    passport.deserializeUser((user: any, done) => done(null, user));
    passport.use(
        'google',
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
            },
            googleOAuthHandler
        )
    );
    passport.use('jwt', new JwtStrategy(jwtConfig, jwtVerify));
    passport.use('jwt-refresh', new CustomStrategy(jwtRefreshVerify));
};
