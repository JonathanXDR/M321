import { IsInt, IsString, IsDate } from 'class-validator';
export class BookDto {
  // validates the data type of the property.
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsDate()
  releaseDate: Date;

  @IsString()
  author: string;
}
