"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadValidator = void 0;
const celebrate_1 = require("celebrate");
exports.uploadValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        mimetype: celebrate_1.Joi.string().required(),
    }),
};
//# sourceMappingURL=upload.js.map