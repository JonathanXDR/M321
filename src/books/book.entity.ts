import { Book } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

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
