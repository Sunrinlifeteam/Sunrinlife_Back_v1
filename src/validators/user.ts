import { Segments } from 'celebrate';
import Joi from 'joi';

const updateUserJoiObject = Joi.object({
    description: Joi.string().max(150),
    image: Joi.string(),
    githubLink: Joi.string().max(200),
    clubInfo: Joi.number(),
});

export const updateUserValidator = {
    [Segments.BODY]: updateUserJoiObject,
};
