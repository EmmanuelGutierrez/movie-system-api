import multer, { memoryStorage, FileFilterCallback } from 'multer';
import path from 'path';
import { HttpException } from '../utils/error/HttpException';
function checkFileType(
  file: Express.Multer.File,
  cb: FileFilterCallback,
  types: RegExp,
) {
  const extname = types.test(path.extname(file.originalname).toLowerCase());
  const mimeType = types.test(file.mimetype);
  if (mimeType && extname) {
    return cb(null, true);
  }
  cb(new HttpException('Error type', 400));
}

/* function checkFileType(types: RegExp) {
  return (file: Express.Multer.File, cb: FileFilterCallback) => {
    const extname = types.test(path.extname(file.originalname).toLowerCase());
    const mimeType = types.test(file.mimetype);
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new HttpException('Error type', 400));
  };
} */

const storage = memoryStorage();

export const uploadFile = (type: RegExp = /jpeg|jpg|png|gif/) => {
  const upload = multer({
    storage,
    fileFilter(req, file, callback) {
      checkFileType(file, callback, type);
    },
  }).single('file');
  return upload;
};
