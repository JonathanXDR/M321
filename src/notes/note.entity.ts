import { ApiProperty } from '@nestjs/swagger';
import { Note } from '@prisma/client';

export class NoteEntity implements Note {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  noteCollectionId: string;
}
