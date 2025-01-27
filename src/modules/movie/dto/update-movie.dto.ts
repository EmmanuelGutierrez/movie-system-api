import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateMovieDto:
 *      type: object
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

export class UpdateMovieDto {
  // constructor(data: { name: string }) {
  //   this.name = data.name;
  // }
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  readonly duration?: number;

  @IsNumber()
  @IsOptional()
  readonly release?: number;

  @IsString()
  @IsOptional()
  readonly imageBase64?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly genres?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly actors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly directors?: string[];
}
