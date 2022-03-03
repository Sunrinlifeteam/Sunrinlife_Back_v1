import multer from 'multer';
import { extname } from 'path';

const allowExtension = ['.png', '.jpg', '.gif', '.jpeg'];

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_TEMP_PATH || './tmp');
    },
});
export default multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        var ext = extname(file.originalname);
        if (!allowExtension.includes(ext))
            return callback(new Error('Not allowed file extension'));
        callback(null, true);
    },
});
