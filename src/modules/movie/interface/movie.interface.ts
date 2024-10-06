import { commonI } from '../../../common/models/common.model';
import { FileI } from '../../file/interface/file.interface';

export interface MovieI extends commonI {
  name: string;
  description: string;
  genres: string[];
  actors: string[];
  directors: string[];
  duration: number;
  release: number;
  active: boolean;
  poster: FileI;
}
