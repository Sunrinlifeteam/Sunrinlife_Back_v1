"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MD5 = exports.SHA256 = exports.SHA1 = void 0;
const crypto_1 = __importDefault(require("crypto"));
function SHA1(data) {
    return crypto_1.default.createHash('sha1').update(data).digest('hex');
}
exports.SHA1 = SHA1;
function SHA256(data) {
    return crypto_1.default.createHash('sha256').update(data).digest('hex');
}
exports.SHA256 = SHA256;
function MD5(data) {
    return crypto_1.default.createHash('md5').update(data).digest('hex');
}
exports.MD5 = MD5;
//# sourceMappingURL=hash.js.map