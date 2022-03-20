import { Segments } from 'celebrate';
import Joi from 'joi';

const updateUserJoiObject = Joi.object({
    description: Joi.string().max(150).optional(),
    image: Joi.string().optional(),
    githubLink: Joi.string().max(200).optional(),
    clubInfo: Joi.number().optional(),
});

export const updateUserValidator = {
    [Segments.BODY]: updateUserJoiObject,
};
