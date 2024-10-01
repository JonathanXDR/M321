import { Note } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsArray } from 'class-validator';

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
}
