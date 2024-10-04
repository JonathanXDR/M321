import { ApiProperty } from '@nestjs/swagger';
import { Note, NoteCollection } from '@prisma/client';

// model Note {
//   id               String          @id @default(uuid()) @db.VarChar(36)
//   title            String?         @db.VarChar(100)
//   content          String          @db.Text()
//   NoteCollection   NoteCollection? @relation(fields: [noteCollectionId], references: [id])
//   noteCollectionId String?         @db.VarChar(36)
// }

export class NoteEntity implements Note {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  noteCollection: NoteCollection;

  @ApiProperty()
  noteCollectionId: string;
}
