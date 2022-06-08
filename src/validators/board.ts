import { Joi, Segments } from 'celebrate';

export const writeValidator = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        attachments: Joi.array().items(Joi.string()).optional(),
    }),
};

export const updateValidator = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        attachments: Joi.array().items(Joi.string()).optional(),
    }),
};
