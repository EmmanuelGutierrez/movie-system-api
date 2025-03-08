import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { movieGenres } from '../../../common/constant/genres.enum';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateCinemaDto:
 *      type: object
 *      required :
 *        - name
 *        - description
 *        - features
 *        - location
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

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsString()
  @IsNotEmpty()
  readonly location!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly features?: string[];
} 
