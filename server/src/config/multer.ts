import multer from 'multer';
import path from 'path';

const tempImagePath = path.join(__dirname, '../tmp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempImagePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export { upload };
