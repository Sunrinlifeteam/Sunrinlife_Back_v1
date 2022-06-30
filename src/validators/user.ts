import { Joi, Segments } from 'celebrate';
import { GITHUB_URL_PATTERN } from '../constants';

const updateUserJoiObject = Joi.object({
    description: Joi.string().allow('').max(150).optional(),
    image: Joi.string().allow('').optional(),
    backgroundImage: Joi.string().allow('').optional(),
    githubLink: Joi.string()
        .regex(GITHUB_URL_PATTERN)
        .allow('')
        .max(200)
        .optional(),
    clubInfo: Joi.number().optional(),
    subClubInfo: Joi.array().items(Joi.number()).optional(),
});

export const updateUserValidator = {
    [Segments.BODY]: updateUserJoiObject,
};
