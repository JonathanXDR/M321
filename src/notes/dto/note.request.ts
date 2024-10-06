import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class NoteRequest {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  noteCollectionId: string;
}
