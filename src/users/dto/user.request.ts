import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  age: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gender: string;
}
