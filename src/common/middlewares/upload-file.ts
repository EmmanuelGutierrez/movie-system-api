import multer, { memoryStorage, FileFilterCallback } from 'multer';
import path from 'path';
import { HttpException } from '../utils/error/HttpException';
import { NextFunction, Request, Response } from 'express';
import { CreateMoviePhotosDto } from '../../modules/movie/dto/create-movie-photos.dto';
import { ExtendedRequest } from '../../modules/movie/interface/ExtendedRequest';
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
  // const upload = multer({
  //   storage,
  //   fileFilter(req, file, callback) {
  //     checkFileType(file, callback, type);
  //   },
  // }).single('file');
  const upload = multer({
    storage,
    fileFilter(req, file, callback) {
      checkFileType(file, callback, type);
    },
  });

  const uploadMid = upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'poster', maxCount: 1 },
  ]);

  return uploadMid;
};

export const uploadFileMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
):
  Promise<void | { req: ExtendedRequest; res: Response; next: NextFunction; }> => {
  try {
    await new Promise((resolve, reject) => {
      const upl = uploadFile();
      upl(req, res, (err) => {
        if (err) {
          // console.log('multer error', err);
          reject(err);
        }
        next();
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error de middleware' });
  }
};
