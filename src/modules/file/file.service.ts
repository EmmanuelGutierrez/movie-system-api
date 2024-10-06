import { fileType } from '../../common/constant/fileTypes';
import pLimit from '../../common/libs/limit';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { FileI } from './interface/file.interface';
import { FileModel } from './model/file.model';

export class FileService {
  fileModel = FileModel;
  cloudinaryService = new CloudinaryService();

  async getAll() {
    const files = await this.fileModel.find();
    return files;
  }
  async create(
    fileData: string,
    external_id: string,
    folder: string,
    type?: fileType,
  ) {
    const cloudinaryRes = await this.cloudinaryService.uploadFileBase64(
      fileData,
      external_id,
      folder,
      type,
    );
    const file: FileI = await this.fileModel.create({
      bytes: cloudinaryRes.bytes,
      public_id: cloudinaryRes.public_id,
      format: cloudinaryRes.format,
      original_filename: cloudinaryRes.original_filename,
      resource_type: cloudinaryRes.resource_type,
      secure_url: cloudinaryRes.secure_url,
      url: cloudinaryRes.url,
      folder: cloudinaryRes.folder,
    });
    return file;
  }

  async createMany(
    filesData: string[],
    external_id: string,
    folder: string,
    type?: fileType,
  ) {
    const limit = pLimit(5);
    const filesToUpload = filesData.map((file) => {
      return limit(async () => {
        const res = await this.create(file, external_id, folder, type);
        return res;
      });
    });

    const resProm = await Promise.allSettled(filesToUpload);
    return resProm;
  }
}
