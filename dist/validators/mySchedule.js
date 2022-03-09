"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeValidator = void 0;
const celebrate_1 = require("celebrate");
const constants_1 = require("../constants");
exports.writeValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        date: celebrate_1.Joi.string().regex(constants_1.DATE_PATTERN).required(),
        body: celebrate_1.Joi.string().required(),
    }),
};
//# sourceMappingURL=mySchedule.js.map