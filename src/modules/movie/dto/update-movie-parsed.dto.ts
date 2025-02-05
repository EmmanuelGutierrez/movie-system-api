import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { movieGenres } from '../../../common/constant/genres.enum';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateMovieParsedDto:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name
 *        description:
 *          type: string
 *          description: description
 *        duration:
 *          type: integer
 *          description: duration
 *        release:
 *          type: integer
 *          description: release
 *        genres:
 *          type: array
 *          description: genres
 *          items:
 *            type: string
 *            enum:
 *              - action
 *              - adventure
 *              - sci-fi
 *              - comedy
 *              - drama
 *              - fantasy
 *              - musical
 *              - thriller
 *              - horror
 *              - wetern
 *              - war
 *              - historical
 *              - crim
 *              - noir
 *              - romance
 *              - animation
 *              - documentary
 *        actors:
 *          type: array
 *          description: actors
 *          items:
 *            type: string
 *        directors:
 *          type: array
 *          description: directors
 *          items:
 *            type: string
 *
 */

export class UpdateMovieParsedDto {
  // constructor(data: { name: string }) {
  //   this.name = data.name;
  // }
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsNumber()
  @IsOptional()
  readonly description?: number;

  @IsNumber()
  @IsOptional()
  readonly duration?: number;

  @IsString()
  @IsOptional()
  readonly release?: string;
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  @IsOptional()
  @IsEnum(movieGenres, { each: true })
  readonly genres?: movieGenres[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly actors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly directors?: string[];
}
