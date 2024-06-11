import { IsDecimal, IsEnum, IsString } from 'class-validator';
import { ProductCategory } from '../../enums/productCategory.enum';
import { ProductCondition } from '../../enums/productCondition.enum';
import { ProductEntity } from '../entity/product.entity';

export class CreateProductRequestDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDecimal()
  price: number;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsEnum(ProductEntity)
  condition: ProductCondition;
}
