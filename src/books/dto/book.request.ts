import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookRequest {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  releaseYear: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  author: string;
}
