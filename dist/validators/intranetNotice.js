"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intranetNoticeValidator = void 0;
const celebrate_1 = require("celebrate");
exports.intranetNoticeValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        title: celebrate_1.Joi.string().required(),
        content: celebrate_1.Joi.string().required(),
        attachment: celebrate_1.Joi.array().items(celebrate_1.Joi.number()).required(),
    }),
};
//# sourceMappingURL=intranetNotice.js.map