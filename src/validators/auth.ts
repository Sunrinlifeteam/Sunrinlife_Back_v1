import { Joi } from 'celebrate';
import { SUNRIN_EMAIL_PATTERN } from '../constants';

export const loginValidator = {
    body: Joi.object({
        email: Joi.string().email().regex(SUNRIN_EMAIL_PATTERN).required(),
        password: Joi.string().required(),
    }),
};
