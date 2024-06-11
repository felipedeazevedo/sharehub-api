import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Role } from '../../enums/role.enums';

export class AuthRegisterDTO {
  @IsString()
  name: string;

  @IsString()
  registration: string;

  @IsString()
  type: Role;

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
