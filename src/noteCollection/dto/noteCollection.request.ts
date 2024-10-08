import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class NoteCollectionRequest {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  userId: string;
}
