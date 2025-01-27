import { commonI } from '../../../common/models/common.model';

/**
 * @swagger
 * components:
 *  schemas:
 *    File:
 *      type: object
 *      required :
 *        - _id
 *        - public_id
 *        - format
 *        - resource_type
 *        - bytes
 *        - url
 *        - secure_url
 *        - folder
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        _id:
 *          type: string
 *          description: name
 *        public_id:
 *          type: string
 *          description: description
 *        format:
 *          type: string
 *          description: duration
 *        resource_type:
 *          type: string
 *          description: release
 *        bytes:
 *          type: integer
 *          description: genres
 *        url:
 *          type: string
 *          description: actors
 *        secure_url:
 *          type: string
 *          description: directors
 *        folder:
 *          type: string
 *          description: release
 *        original_filename:
 *          type: string
 *          description: release
 *        createdAt:
 *          type: integer
 *          description: release
 *        updatedAt:
 *          type: integer
 *          description: release
 */

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
