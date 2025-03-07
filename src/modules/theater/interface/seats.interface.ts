
/**
 * @swagger
 * components:
 *  schemas:
 *    Seat:
 *      type: object
 *      required :
 *        - _id
 *        - userId
 *        - row
 *        - number
 *        - occupied
 *      properties:
 *        _id:
 *          type: string
 *        userId:
 *          type: string
 *        row:
 *          type: integer
 *          description: row
 *        number:
 *          type: integer
 *          description: number
 *        status:
 *          $ref: "#/components/schemas/StatusSeat"
 *
 */

import { statusSeat } from "../../../common/constant/seat-status.enum";

export interface SeatsI {
  _id?: string;
  userId?: string;
  row: number;
  number: number;
  // occupied: boolean;
  status:statusSeat

}
