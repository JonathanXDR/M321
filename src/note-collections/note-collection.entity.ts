import { ApiProperty } from '@nestjs/swagger';
import { NoteCollection } from '@prisma/client';

export class NoteCollectionEntity implements NoteCollection {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  userId: string;
}
