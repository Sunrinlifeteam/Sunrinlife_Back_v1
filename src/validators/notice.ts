import { Joi, Segments } from 'celebrate';

export const noticeWriteValidator = {
    [Segments.BODY]: Joi.object({
        type: Joi.string()
            .regex(/(school|intranet)/)
            .required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
    }),
};
