//!!Verificar si funciona
/**
 * @swagger
 * components:
 *  schemas:
 *    StatusSeat:
 *      type: string
 *      enum:
 *        - occupied
 *        - available
 *        - temporarily_reserved
 *        - disabled
 *
 *
 */

export enum statusSeat {
  AVAILABLE = 'available',
  TEMPORARILY_RESERVED = 'temporarily_reserved',
  OCCUPIED = 'occupied',
  DISABLED = 'disabled',
}
