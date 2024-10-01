import { commonI } from "../../../common/models/common.model";

export interface MovieI extends commonI {
  name: string;
  description: string;
  genres: string[];
  actors: string[];
  directors: string[];
  duration: number;
  relase: number;
  active: boolean;
}