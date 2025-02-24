import { movieGenres } from '../../../common/constant/genres.enum';
import { commonI } from '../../../common/models/common.model';
import { FileI } from '../../file/interface/file.interface';

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
 *        - duration
 *        - release
 *        - genres
 *        - actors
 *        - directors
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
 *        duration:
 *          type: integer
 *          description: duration
 *        release:
 *          type: integer
 *          description: release
 *        genres:
 *          type: array
 *          description: genres
 *          items:
 *            type: string
 *            enum:
 *              - action
 *              - adventure
 *              - sci-fi
 *              - comedy
 *              - drama
 *              - fantasy
 *              - musical
 *              - thriller
 *              - horror
 *              - wetern
 *              - war
 *              - historical
 *              - crim
 *              - noir
 *              - romance
 *              - animation
 *              - documentary
 *        actors:
 *          type: array
 *          description: actors
 *          items:
 *            type: string
 *        directors:
 *          type: array
 *          description: directors
 *          items:
 *            type: string
 *        poster:
 *          $ref: '#/components/schemas/File'
 *        photos:
 *          type: array
 *          description: photos
 *          items:
 *            $ref: '#/components/schemas/File'
 *        createdAt:
 *          type: integer
 *          description: release
 *        updatedAt:
 *          type: integer
 *          description: release
 *
 */

export interface MovieI extends commonI {
  name: string;
  description: string;
  genres: movieGenres[];
  actors: string[];
  directors: string[];
  duration: number;
  release: number;
  active: boolean;
  poster: FileI;
  photos: FileI[];
}
