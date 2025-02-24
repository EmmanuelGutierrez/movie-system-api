import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    FilterDto:
 *      type: object
 *      properties:
 *        limit:
 *          type: integer
 *          description: limit
 *        page:
 *          type: integer
 *          description: page
 *        rows:
 *          type: integer
 *          description: rows
 *        seatsPerRow:
 *          type: integer
 *          description: seatsPerRow
 *        name:
 *          type: string
 *          description: name
 *
 */

export class FilterDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  rows?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  seatsPerRow?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
