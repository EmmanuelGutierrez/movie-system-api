import { v2 } from 'cloudinary';
import { config } from '../../../config/config';

export class CloudinaryProvider {
  constructor() {
    v2.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
    });
  }
}
