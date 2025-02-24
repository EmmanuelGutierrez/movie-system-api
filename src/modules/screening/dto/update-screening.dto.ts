import {   IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateScreeningDto:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        movieId:
 *          type: string
 *        price:
 *          type: number
 *
 */

export class UpdateScreeningDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly movieId?: string;

  @IsNumber()
  @IsOptional()
  readonly price?: number;
}
