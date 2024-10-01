import { ApiProperty } from '@nestjs/swagger';
import { NoteCollection, Note } from '@prisma/client';

export class NoteCollectionEntity implements NoteCollection {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  notes: Note[];

  @ApiProperty()
  userId: string;
}
