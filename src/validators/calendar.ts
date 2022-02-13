import { Joi, Segments } from 'celebrate';
import { DateTime } from 'luxon';

export const CalendarValidator = {
    [Segments.QUERY]: Joi.object({
        year: Joi.number().default(DateTime.now().setZone('Asia/Seoul').year),
        month: Joi.number().default(DateTime.now().setZone('Asia/Seoul').month),
        day: Joi.number().default(DateTime.now().setZone('Asia/Seoul').day),
    }),
};
