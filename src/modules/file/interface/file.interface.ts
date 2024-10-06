import { commonI } from '../../../common/models/common.model';

export interface FileI extends commonI {
  asset_id?: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  url: string;
  secure_url: string;
  folder: string;
  original_filename?: string;
}
