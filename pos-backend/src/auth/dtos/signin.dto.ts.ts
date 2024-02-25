import { IsEmail, IsString, MinLength } from 'class-validator';

export class SigninDtoTs {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(3)
  password: string;
}
