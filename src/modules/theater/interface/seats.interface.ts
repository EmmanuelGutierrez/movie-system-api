
/**
 * @swagger
 * components:
 *  schemas:
 *    Seat:
 *      type: object
 *      required :
 *        - _id
 *        - row
 *        - number
 *        - occupied
 *      properties:
 *        _id:
 *          type: string
 *        row:
 *          type: integer
 *          description: row
 *        number:
 *          type: integer
 *          description: number
 *        occupied:
 *          type: boolean
 *          description: occupied
 *
 */

export interface SeatsI{
    row:number
    number:number
    occupied:boolean
}