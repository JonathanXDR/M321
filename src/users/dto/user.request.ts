import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRequest {
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
