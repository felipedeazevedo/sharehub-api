import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserRequestDTO {
  @IsString()
  @IsOptional()
  @MaxLength(60)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  @Matches(/^[Uu][Cc]\d{8}$/, {
    message: 'Formato de matrícula inválido. Deve ser UC seguido de 8 dígitos.',
  })
  registration: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
    minUppercase: 0,
    minLowercase: 0,
    minNumbers: 0,
  })
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  @MaxLength(20)
  phone: string;
}
