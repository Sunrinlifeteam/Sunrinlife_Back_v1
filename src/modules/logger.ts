import { isProduction } from '../constants';

export default {
    log: console.log,
    info: console.info,
    debug: isProduction ? () => {} : console.debug,
    error: console.error,
    warn: console.warn,
};
