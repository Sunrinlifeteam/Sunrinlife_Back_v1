import { Joi, Segments } from 'celebrate';

export const intranetNoticeValidator = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        attachment: Joi.array().items(Joi.number()).required(),
    }),
};
