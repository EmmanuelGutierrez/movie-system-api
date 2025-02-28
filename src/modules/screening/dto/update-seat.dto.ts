/**
 * @swagger
 * components:
 *  schemas:
 *    GetListScreeningDto:
 *      type: object
 *      required :
 *        - row
 *        - number
 *        - screeningId
 *        - occupied
 *      properties:
 *        row:
 *          type: integer
 *          description: row
 *
 *        number:
 *          type: integer
 *          description: number
 *
 *        occupied:
 *          type: boolean
 *          description: occupied
 *
 *        screeningId:
 *          type: string
 *          description: screeningId
 *
 */

import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSeatDto {
  @IsNotEmpty()
  @IsNumber()
  row!: number;

  @IsNotEmpty()
  @IsNumber()
  number!: number;

  @IsNotEmpty()
  @IsString()
  screeningId!: string;

  @IsNotEmpty()
  @IsBoolean()
  occupied!: boolean;
}
