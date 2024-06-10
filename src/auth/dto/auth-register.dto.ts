import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthRegisterDTO {
  @IsString()
  name: string;

  @IsString()
  registration: string;

  @IsString()
  type: UserType;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
    minUppercase: 0,
    minLowercase: 0,
    minNumbers: 0,
  })
  password: string;

  @IsString()
  phone: string;
}

enum UserType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}
