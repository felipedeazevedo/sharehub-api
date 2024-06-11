import { IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';
import { CreateProductRequestDTO } from '../../product/dto/CreateProductRequestDTO';
import { Type } from 'class-transformer';

export class CreatePostRequestDTO {
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateProductRequestDTO)
  product: CreateProductRequestDTO;

  @IsNumber()
  userId: number;
}
