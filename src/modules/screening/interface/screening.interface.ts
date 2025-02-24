import { movieGenres } from '../../../common/constant/genres.enum';
import { commonI } from '../../../common/models/common.model';
import { FileI } from '../../file/interface/file.interface';
import { MovieI } from '../../movie/interface/movie.interface';
import { SeatsI } from '../../theater/interface/seats.interface';
import { TheaterI } from '../../theater/interface/theater.interface';

/**
 * @swagger
 * components:
 *  schemas:
 *    Screening:
 *      type: object
 *      required :
 *        - _id
 *        - name
 *        - movie
 *        - startTime
 *        - theater
 *        - endTime
 *        - price  
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *          description: name
 *        movie:
 *          $ref: '#/components/schemas/Movie'
 *        theater:
 *          $ref: '#/components/schemas/Theater'
 *        startTime:
 *          type: integer
 *          description: start time
 *        endTime:
 *          type: integer
 *          description: end time
 *        price:
 *          type: number
 *          description: price
 *        active:
 *          type: boolean
 *          description: is active
 *        availableSeats:
 *          type: array
 *          description: seats
 *          items:
 *            $ref: '#/components/schemas/Seat'
 *        createdAt:
 *          type: integer
 *          description: release
 *        updatedAt:
 *          type: integer
 *          description: release
 *
 */

export interface ScreeningI extends commonI {
  _id: string;
  name: string;
  movie: MovieI;
  theater: TheaterI;
  startTime: number;
  endTime: number;
  price: number;
  active: boolean;
  availableSeats: [SeatsI];
}

