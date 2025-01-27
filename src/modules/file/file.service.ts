import { fileType } from '../../common/constant/fileTypes';
import pLimit from '../../common/libs/limit';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { FileI } from './interface/file.interface';
import { FileModel } from './model/file.model';

interface CreateManyI {
  filesData: Express.Multer.File[] | string[];
  external_id: string;
  folder: string;
  type?: fileType;
  toBase64?: boolean;
}

export class FileService {
  fileModel = FileModel;
  cloudinaryService = new CloudinaryService();

  async getAll() {
    const files = await this.fileModel.find();
    return files;
  }
  async createBase64(
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
  async create(
    fileData: Express.Multer.File,
    external_id: string,
    folder: string,
    type?: fileType,
  ) {
    const cloudinaryRes = await this.cloudinaryService.uploadFileStream(
      fileData,
      external_id,
      folder,
      type,
    );
    if (!cloudinaryRes) {
      throw new Error("No cloudinary response")
    }
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

  async createMany({
    filesData,
    external_id,
    folder,
    type,
    toBase64,
  }: CreateManyI) {
    const filesToUpload = filesData.map((file) => {
      console.log(file);
      if (toBase64) {
        const res = this.create(
          file as Express.Multer.File,
          external_id,
          folder,
          type,
        );
        return res;
      } else {
        const res = this.createBase64(file as string, external_id, folder, type);
        return res;
      }
    });

    const resProm = await Promise.all(filesToUpload);
    return resProm;
  }
}
