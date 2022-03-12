import { isProduction } from './isProduction';

export const REFRESH_TOKEN_COOKIE_OPTION = {
    ...(isProduction ? { domain: process.env.SERVICE_DOMAIN } : {}),
    httpOnly: isProduction,
    secure: isProduction,
    maxAge: 2592000000,
};

console.log(REFRESH_TOKEN_COOKIE_OPTION);

export const REFRESH_TOKEN_COOKIE_KEY = 'Refresh';
