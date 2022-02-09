import { Joi, Segments } from 'celebrate';

export const uploadValidator = {
    [Segments.BODY]: Joi.object({
        mimetype: Joi.string().required(),
    }),
};
