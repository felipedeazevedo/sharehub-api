import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
    minUppercase: 0,
    minLowercase: 0,
    minNumbers: 0,
  })
  password: string;
}
