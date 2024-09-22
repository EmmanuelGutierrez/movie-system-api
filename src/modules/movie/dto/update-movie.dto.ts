import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMovieDto  {
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
  readonly relase?: number;

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
