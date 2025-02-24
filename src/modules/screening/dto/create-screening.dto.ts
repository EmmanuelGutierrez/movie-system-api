import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateScreeningDto:
 *      type: object
 *      required :
 *        - name
 *        - movieId
 *        - theaterId
 *        - price
 *        - startTime
 *      properties:
 *        name:
 *          type: string
 *        movieId:
 *          type: string
 *        theaterId:
 *          type: string
 *        price:
 *          type: number
 *        startTime:
 *          type: number
 *
 */

export class CreateScreeningDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly movieId!: string;

  @IsString()
  @IsNotEmpty()
  readonly theaterId!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly startTime!: number;
}
