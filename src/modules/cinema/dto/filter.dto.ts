import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    FilterCinemaDto:
 *      type: object
 *      properties:
 *        limit:
 *          type: integer
 *          description: limit
 *        page:
 *          type: integer
 *          description: page
 *        name:
 *          type: string
 *          description: name
 *        location:
 *          type: string
 *          description: location
 *
 */



export class FilterCinemaDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;


  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
