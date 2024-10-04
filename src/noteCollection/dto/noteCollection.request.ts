import { Note } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsArray } from 'class-validator';

// model NoteCollection {
//   id     String  @id @default(uuid()) @db.VarChar(36)
//   title  String  @db.VarChar(100)
//   notes  Note[]
//   User   User?   @relation(fields: [userId], references: [id])
//   userId String? @db.VarChar(36)
// }

export class NoteCollectionRequest {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  notes: Note[];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  noteCollectionId: string;
}
