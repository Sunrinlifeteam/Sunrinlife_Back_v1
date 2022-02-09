import multer from 'multer';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_TEMP_PATH || './tmp');
    },
});
export default multer({ storage: storage });
