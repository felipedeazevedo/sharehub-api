import { IsDecimal, IsString } from 'class-validator';
import { ProductCategory } from '../../enums/productCategory.enum';
import { ProductCondition } from '../../enums/productCondition.enum';

export class CreateProductRequestDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDecimal()
  price: number;

  @IsString()
  category: ProductCategory;

  @IsString()
  condition: ProductCondition;
}
