import { Joi, Segments } from 'celebrate';
import { DATE_PATTERN } from '../constants';

export const writeValidator = {
    [Segments.BODY]: Joi.object({
        date: Joi.string().regex(DATE_PATTERN).required(),
        title: Joi.string().required(),
        body: Joi.string().required(),
        attachment: Joi.array().items(Joi.number()).required(),
    }),
};
