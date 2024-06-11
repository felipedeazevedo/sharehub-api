import { IsNotEmptyObject } from 'class-validator';
import { UpdateProdutcRequestDTO } from '../../product/dto/UpdateProdutcRequestDTO';

export class UpdatePostRequestDTO {
  @IsNotEmptyObject()
  product: UpdateProdutcRequestDTO;
}
