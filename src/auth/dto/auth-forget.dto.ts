import { IsEmail, MaxLength } from 'class-validator';

export class AuthForgetDTO {
  @IsEmail()
  @MaxLength(100)
  email: string;
}
