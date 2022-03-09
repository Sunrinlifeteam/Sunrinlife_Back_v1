"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultParameterSchema = void 0;
const axios_1 = __importDefault(require("axios"));
const celebrate_1 = require("celebrate");
exports.DefaultParameterSchema = celebrate_1.Joi.object({
    KEY: celebrate_1.Joi.string(),
    Type: celebrate_1.Joi.string().valid('xml', 'json').default('xml'),
    pIndex: celebrate_1.Joi.number().default(1),
    pSize: celebrate_1.Joi.number().default(100),
});
exports.default = axios_1.default.create({
    baseURL: 'https://open.neis.go.kr/hub/',
});
//export { default as SchoolSchedule } from './SchoolSchedule';
__exportStar(require("./SchoolSchedule"), exports);
//# sourceMappingURL=index.js.map