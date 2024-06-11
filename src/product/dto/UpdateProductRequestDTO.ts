import {
  IsDecimal,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductCategory } from '../../enums/productCategory.enum';
import { ProductCondition } from '../../enums/productCondition.enum';

export class UpdateProductRequestDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDecimal()
  @IsOptional()
  price: number;

  @IsEnum(ProductCategory)
  @IsOptional()
  category: ProductCategory;

  @IsEnum(ProductCondition)
  @IsOptional()
  condition: ProductCondition;
}
