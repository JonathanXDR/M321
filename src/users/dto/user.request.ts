import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UserRequest {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  age: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  gender: string;
}
