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
 *
 */

export class UpdateScreeningDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

}
