import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookRequest {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  releaseYear: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  author: string;
}
