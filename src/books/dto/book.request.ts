import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BookRequest {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  releaseYear: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  author: string;
}
