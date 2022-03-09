"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthValidator = void 0;
const celebrate_1 = require("celebrate");
const constants_1 = require("../constants");
exports.OAuthValidator = {
    user: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().regex(constants_1.SUNRIN_EMAIL_PATTERN).required(),
        username: celebrate_1.Joi.string().required(),
        department: celebrate_1.Joi.string().required(),
        grade: celebrate_1.Joi.number().integer().min(1).max(3).required(),
        class: celebrate_1.Joi.number().integer().min(1).max(12).required(),
        number: celebrate_1.Joi.number().integer().min(1).required(),
        accountType: celebrate_1.Joi.number().integer().min(0).max(2).required(),
    }),
};
//# sourceMappingURL=auth.js.map