import {
  IsAlphanumeric,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ProductCategory } from '../../enums/productCategory.enum';
import { ProductCondition } from '../../enums/productCondition.enum';

export class UpdateProductRequestDTO {
  @IsString()
  @IsOptional()
  @Matches(/^[\p{L}0-9\s]+$/u, {
    message: 'Title must only contain alphanumeric characters and spaces',
  })
  @MaxLength(100, {
    message: 'Title must have less than 100 characters long',
  })
  title: string;

  @IsString()
  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(250, {
    message: 'Description must have less than 250 characters long',
  })
  description: string;

  @IsString()
  @Matches(/^\d{1,3}(\.\d{3})*,\d{2}$/, {
    message: 'Price must be in pt-BR format - 0000.000,00',
  })
  @IsOptional()
  price: string;

  @IsEnum(ProductCategory)
  @IsOptional()
  category: ProductCategory;

  @IsEnum(ProductCondition)
  @IsOptional()
  condition: ProductCondition;
}
