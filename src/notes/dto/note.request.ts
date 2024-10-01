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
}
