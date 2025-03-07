import { movieGenres } from '../../../common/constant/genres.enum';
import { commonI } from '../../../common/models/common.model';
import { FileI } from '../../file/interface/file.interface';
import { TheaterI } from '../../theater/interface/theater.interface';

/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      required :
 *        - _id
 *        - name
 *        - description
 *        - location
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *          description: name
 *        description:
 *          type: string
 *          description: description
 *        location:
 *          type: string
 *          description: location
 *        features:
 *          type: array
 *          description: genres
 *          items:
 *            type: string
 *        createdAt:
 *          type: integer
 *          description: release
 *        updatedAt:
 *          type: integer
 *          description: release
 *
 */

export interface CinemaI extends commonI {
  name: string;
  description: string;
  // theaters: TheaterI[];
  features: string[];
  location:string
}
