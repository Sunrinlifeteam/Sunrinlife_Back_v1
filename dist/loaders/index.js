"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const database_1 = __importDefault(require("./database"));
const session_1 = __importDefault(require("./session"));
const route_1 = __importDefault(require("./route"));
const neisSyncer_1 = __importDefault(require("./neisSyncer"));
const passport_1 = __importDefault(require("./passport"));
exports.default = async ({ app }) => {
    await (0, database_1.default)();
    await (0, express_1.default)(app);
    await (0, session_1.default)(app);
    await (0, passport_1.default)(app);
    await (0, route_1.default)(app);
    await (0, neisSyncer_1.default)(60 * 60);
};
//# sourceMappingURL=index.js.map