import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../../enums/productCategory.enum';
import { ProductCondition } from '../../enums/productCondition.enum';

export class UpdateProdutcRequestDTO {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDecimal()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  category: ProductCategory;

  @IsString()
  @IsOptional()
  condition: ProductCondition;
}
