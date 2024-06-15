import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';
import { Role } from '../../enums/role.enums';

export class AuthRegisterDTO {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsString()
  @MaxLength(11)
  @Matches(/^[Uu][Cc]\d{8}$/, {
    message: 'Formato de matrícula inválido. Deve ser UC seguido de 8 dígitos.',
  })
  registration: string;

  @IsEnum(Role)
  type: Role;

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

  @IsString()
  @IsPhoneNumber('BR')
  @MaxLength(20)
  phone: string;
}
