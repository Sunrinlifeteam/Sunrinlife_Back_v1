import { Segments } from 'celebrate';
import Joi from 'joi';

const updateUserJoiObject = Joi.object({
    description: Joi.string().allow('').max(150).optional(),
    image: Joi.string().allow('').optional(),
    githubLink: Joi.string().allow('').max(200).optional(),
    clubInfo: Joi.number().optional(),
});

export const updateUserValidator = {
    [Segments.BODY]: updateUserJoiObject,
};
