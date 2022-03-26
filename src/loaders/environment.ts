import { isProduction } from '../constants';

const format = function (name: string) {
    return `Environment ${name} is empty`;
};

export const ENVIRONMENT_NAMES = [
    'DB_NAME',
    'DB_PORT',
    'DB_HOST',
    'DB_USERNAME',
    'DB_PASSWORD',
    'UPLOAD_TEMP_PATH',
    'UPLOAD_PATH',
    'ATPT_OFCDC_SC_CODE',
    'SD_SCHUL_CODE',
    'SESSION_SECRET',
    'NEIS_API_KEY',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CALLBACK_URL',
    'ACCESS_TOKEN_SECRET',
    'ACCESS_TOKEN_EXPIRES_IN',
    'REFRESH_TOKEN_SECRET',
    'REFRESH_TOKEN_EXPIRES_IN',
    'SERVICE_DOMAIN',
    'FRONTEND_URL',
];

export default async () => {
    console.log(
        `Server run in ${isProduction ? 'Production' : 'Development'} mode!`
    );
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
    if (!process.env.PORT) process.env.PORT = '80';
    for (const env_name of ENVIRONMENT_NAMES) {
        if (!process.env[env_name]) throw new Error(format(env_name));
    }
};
