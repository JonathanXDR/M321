import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';

export class BookEntity implements Book {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  releaseYear: number;

  @ApiProperty()
  author: string;
}
