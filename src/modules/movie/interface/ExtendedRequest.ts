import { Request } from "express";
import { CreateMoviePhotosDto } from "../dto/create-movie-photos.dto";
import { PhotosPoster } from "../../file/type/multiple-files.type";

export interface ExtendedRequest<T> extends Request {
  body: T;
  files: PhotosPoster;
}