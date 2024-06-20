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
  @MaxLength(100, {
    message: 'Título deve ter menos de 100 caracteres',
  })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(250, {
    message: 'Descrição deve ter menos de 250 caracteres',
  })
  description: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsEnum(ProductCategory)
  @IsOptional()
  category: ProductCategory;

  @IsEnum(ProductCondition)
  @IsOptional()
  condition: ProductCondition;
}
