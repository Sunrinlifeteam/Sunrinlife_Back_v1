"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const allowExtension = ['.png', '.jpg', '.gif', '.jpeg'];
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_TEMP_PATH || './tmp');
    },
});
exports.default = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, callback) => {
        var ext = (0, path_1.extname)(file.originalname);
        if (!allowExtension.includes(ext))
            return callback(new Error('Not allowed file extension'));
        callback(null, true);
    },
});
//# sourceMappingURL=upload.js.map