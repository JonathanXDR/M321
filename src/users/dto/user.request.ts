import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRequest {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  gender: string;
}
