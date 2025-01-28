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
 *    CreateMovieDto:
 *      type: object
 *      required :
 *        - name
 *        - description
 *        - imageBase64
 *        - duration
 *        - release
 *        - genres
 *        - actors
 *        - directors
 *      properties:
 *        name:
 *          type: string
 *          description: name
 *        description:
 *          type: string
 *          description: description
 *        imageBase64:
 *          type: string
 *          description: image in base64
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

export class CreateMovieDto {
  // constructor(data: { name: string }) {
  //   this.name = data.name;
  // }
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly release!: number;

  @IsString()
  @IsNotEmpty()
  readonly imageBase64!: string;

  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
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

  // @IsNotEmpty()
  // @IsArray()
  // @IsString({ each: true })
  // readonly images?: string[];
} 
