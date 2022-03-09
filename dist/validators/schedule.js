"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValidator = void 0;
const celebrate_1 = require("celebrate");
const luxon_1 = require("luxon");
exports.DateValidator = {
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object({
        year: celebrate_1.Joi.number().default(luxon_1.DateTime.now().setZone('Asia/Seoul').year),
        month: celebrate_1.Joi.number().default(luxon_1.DateTime.now().setZone('Asia/Seoul').month),
        day: celebrate_1.Joi.number().default(luxon_1.DateTime.now().setZone('Asia/Seoul').day),
    }),
};
//# sourceMappingURL=schedule.js.map