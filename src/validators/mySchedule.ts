import { Joi, Segments } from 'celebrate';
import { DATE_PATTERN } from '../constants';

export const writeValidator = {
    [Segments.BODY]: Joi.object({
        date: Joi.string().regex(DATE_PATTERN).required(),
        body: Joi.string().required(),
    }),
};
