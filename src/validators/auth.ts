import { Joi } from 'celebrate';
import { SUNRIN_EMAIL_PATTERN } from '../constants';

export const OAuthValidator = {
    user: Joi.object({
        email: Joi.string().email().regex(SUNRIN_EMAIL_PATTERN).required(),
        username: Joi.string().required(),
        department: Joi.string().required(),
        grade: Joi.number().integer().min(1).max(3).required(),
        class: Joi.number().integer().min(1).max(12).required(),
        number: Joi.number().integer().min(1).required(),
        accountType: Joi.number().integer().min(0).max(2).required(),
    }),
};
