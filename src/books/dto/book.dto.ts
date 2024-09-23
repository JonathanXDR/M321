import { IsInt, IsString } from 'class-validator';
export class BookDto {
  // validates the data type of the property.
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsInt()
  releaseDate: number;

  @IsString()
  author: string;
}
