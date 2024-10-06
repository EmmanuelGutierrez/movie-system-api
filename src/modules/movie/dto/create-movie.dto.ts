import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  // @IsNotEmpty()
  // @IsArray()
  // @IsString({ each: true })
  // readonly images?: string[];
}

/* export const CreateMovieSchema: Schema = {
  name: { isString: true },
  description: { isString: true },
  genre: { isArray: true, optional: true },
  actors: { isArray: true, optional: true },
  directors: { isArray: true, optional: true },
  duration: { isNumeric: true },
  release: { isNumeric: true },
};
 */
