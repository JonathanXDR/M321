import { ApiProperty } from '@nestjs/swagger';
import { NoteCollection, Note } from '@prisma/client';

// model NoteCollection {
//   id     String  @id @default(uuid()) @db.VarChar(36)
//   title  String  @db.VarChar(100)
//   notes  Note[]
//   User   User?   @relation(fields: [userId], references: [id])
//   userId String? @db.VarChar(36)
// }

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
