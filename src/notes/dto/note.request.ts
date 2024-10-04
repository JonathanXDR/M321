import { NoteCollection } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsObject,
} from 'class-validator';

// model Note {
//   id               String          @id @default(uuid()) @db.VarChar(36)
//   title            String?         @db.VarChar(100)
//   content          String          @db.Text()
//   NoteCollection   NoteCollection? @relation(fields: [noteCollectionId], references: [id])
//   noteCollectionId String?         @db.VarChar(36)
// }

export class NoteRequest {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  content: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  noteCollection: NoteCollection;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  noteCollectionId: string;
}
