import {
  IsAlphanumeric,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ProductCategory } from '../../enums/productCategory.enum';
import { ProductCondition } from '../../enums/productCondition.enum';

export class CreateProductRequestDTO {
  @IsString()
  @IsAlphanumeric()
  @MaxLength(100, {
    message: 'Title must have less than 100 characters long',
  })
  title: string;

  @IsString()
  @IsAlphanumeric()
  @MaxLength(250, {
    message: 'Description must have less than 250 characters long',
  })
  description: string;

  @IsString()
  @Matches(/^\d{1,3}(\.\d{3})*,\d{2}$/, {
    message: 'Price must be in pt-BR format - 0000.000,00',
  })
  price: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsEnum(ProductCondition)
  condition: ProductCondition;
}
