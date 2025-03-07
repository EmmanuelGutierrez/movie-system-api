import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { movieGenres } from '../../../common/constant/genres.enum';

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateCinemaDto:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name
 *        description:
 *          type: string
 *          description: description
 *        location:
 *          type: string
 *          description: lotcation
 *        features:
 *          type: array
 *          description: actors
 *          items:
 *            type: string
 *
 */

export class UpdateCinemaDto {
  @IsString()
  @IsOptional()
  readonly name!: string;

  @IsString()
  @IsOptional()
  readonly description!: string;

  @IsString()
  @IsOptional()
  readonly location!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly features?: string[];
}
