import { fileType } from '../../common/constant/fileTypes';
import pLimit from '../../common/libs/limit';
import { HttpException } from '../../common/utils/error/HttpException';
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

  async getOneById(id: string) {
    try {
      const file = await this.fileModel.findById(id);

      if (!file) {
        throw new HttpException('Archivo no encontrado', 404);
      }

      return file;
    } catch (error) {
      throw new HttpException('error al buscar un archivo', 400);
    }
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
    folder: string,
    type?: fileType,
  ) {
    const fileId = new FileModel()
    fileId._id
    const cloudinaryRes = await this.cloudinaryService.uploadFileStream(
      fileData,
      fileId._id,
      folder,
      type,
    );
    if (!cloudinaryRes) {
      throw new Error('No cloudinary response');
    }
    const file: FileI = await this.fileModel.create({
      _id:fileId._id,
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
      if (toBase64) {
        const res = this.create(
          file as Express.Multer.File,
          folder,
          type,
        );
        return res;
      } else {
        const res = this.createBase64(
          file as string,
          external_id,
          folder,
          type,
        );
        return res;
      }
    });

    const resProm = await Promise.all(filesToUpload);
    return resProm;
  }

  async deleteFile(id: string) {
    const file = await this.getOneById(id);
    await this.cloudinaryService.deleteFile(file.public_id);
    const res = await this.fileModel.deleteOne({ _id: id });
    return res;
  }

  async deleteFileMany({
    public_ids,
    ids,
  }: {
    public_ids: string[];
    ids: string[];
  }) {
    await this.cloudinaryService.deleteFileMany(public_ids);
    const res = await this.fileModel.deleteMany({ _id: { $in: ids } });
    return res;
  }
}
