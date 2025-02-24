import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateTheaterDto:
 *      type: object
 *      required :
 *        - name
 *        - rows
 *        - seatPerRow
 *      properties:
 *        name:
 *          type: string
 *        rows:
 *          type: integer
 *        seatsPerRow:
 *          type: integer
 *
 */

export class CreateTheaterDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rows!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly seatsPerRow!: number;
}
