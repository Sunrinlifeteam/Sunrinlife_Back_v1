import { Joi, Segments } from 'celebrate';

export const writeValidator = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        type: Joi.number().required(),
        attachments: Joi.array().items(Joi.number()).optional(),
    }),
};

export const updateValidator = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        type: Joi.number().optional(),
        attachments: Joi.array().items(Joi.number()).optional(),
    }),
};
