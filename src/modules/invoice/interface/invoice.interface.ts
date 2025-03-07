import { movieGenres } from '../../../common/constant/genres.enum';
import { commonI } from '../../../common/models/common.model';
import { FileI } from '../../file/interface/file.interface';
import { ScreeningI } from '../../screening/interface/screening.interface';
import { SeatsI } from '../../theater/interface/seats.interface';
import { TheaterI } from '../../theater/interface/theater.interface';
import { UserI } from '../../user/interface/user.interface';

/**
 * @swagger
 * components:
 *  schemas:
 *    Invoice:
 *      type: object
 *      required :
 *        - _id
 *        - screening
 *        - user
 *        - seats
 *        - totalPrice
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        _id:
 *          type: string
 *        screening:
 *          $ref: '#/components/schemas/Screening'
 *        user:
 *          $ref: '#/components/schemas/User'
 *        seats:
 *          type: array
 *          description: seats
 *          items:
 *            $ref: '#/components/schemas/Seat'
 *        totalPrice:
 *          type: number
 *          description: price
 *        createdAt:
 *          type: integer
 *          description: release
 *        updatedAt:
 *          type: integer
 *          description: release
 *
 */

export interface InvoiceI extends commonI {
  screening: ScreeningI;
  user: UserI;
  seats: SeatsI[];
  totalPrice: number;
}
