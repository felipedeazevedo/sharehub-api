import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserRequestDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  registration: string;

  @IsEmail()
  @IsOptional()
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
  phone: string;
}
