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
  @MaxLength(100, {
    message: 'Título deve ter menos de 100 caracteres',
  })
  title: string;

  @IsString()
  @MaxLength(250, {
    message: 'Descrição deve ter menos de 250 caracteres',
  })
  description: string;

  @IsString()
  price: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsEnum(ProductCondition)
  condition: ProductCondition;
}
