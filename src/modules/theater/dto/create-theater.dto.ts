import {  IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateTheaterDto:
 *      type: object
 *      required :
 *        - name
 *        - rows
 *        - cinemaId
 *        - seatPerRow
 *      properties:
 *        name:
 *          type: string
 *        cinemaId:
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

  @IsMongoId()
  @IsNotEmpty()
  readonly cinemaId!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rows!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly seatsPerRow!: number;
}
