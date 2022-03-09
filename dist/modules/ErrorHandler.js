"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const logger_1 = __importDefault(require("./logger"));
function ErrorHandler(error, res) {
    logger_1.default.error(error.stack);
    return res.sendStatus(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map