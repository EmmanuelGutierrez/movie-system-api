import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

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
 *        description:
 *          type: string
 *          description: description
 *        genres:
 *          type: array
 *          description: actors
 *          items:
 *            type: string
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
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
