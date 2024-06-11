import { IsNotEmptyObject, IsNumber } from 'class-validator';
import { CreateProductRequestDTO } from '../../product/dto/CreateProductRequestDTO';

export class CreatePostRequestDTO {
  @IsNotEmptyObject()
  product: CreateProductRequestDTO;

  @IsNumber()
  userId: number;
}
