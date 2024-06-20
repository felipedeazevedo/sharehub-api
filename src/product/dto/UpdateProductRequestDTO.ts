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
  @IsAlphanumeric()
  @MaxLength(250, {
    message: 'Descrição deve ter menos de 250 caracteres',
  })
  description: string;

  @IsString()
  @Matches(/^\d{1,3}(\.\d{3})*,\d{2}$/, {
    message: 'Preço deve estar no formato pt-BR - 0000.000,00',
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
