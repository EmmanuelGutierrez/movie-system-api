import { fileType } from '../../../common/constant/fileTypes';
import { CloudinaryResponse } from '../../../common/models/CloudinaryResponse.model';

import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { CloudinaryProvider } from './cloudinary';

export class CloudinaryService extends CloudinaryProvider {
  async uploadFile(
    file: Express.Multer.File,
    external_id: string,
    folder?: string,
    resource_type?: fileType,
  ) {
    return new Promise<CloudinaryResponse | undefined>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type, public_id: external_id, folder },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  async uploadFileBase64(
    file: string,
    external_id: string,
    folder?: string,
    resource_type?: fileType,
  ) {
    const result = await cloudinary.uploader.upload(file, {
      resource_type,
      folder,
      public_id: external_id,
      // overwrite: true,
      // invalidate: true,
      // crop: 'fill',
    });
    return result;
  }
}
