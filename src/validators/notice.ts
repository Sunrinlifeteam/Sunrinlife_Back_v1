import { Joi, Segments } from 'celebrate';

export const writeValidator = {
    [Segments.BODY]: Joi.object({
        type: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
    }),
};
