import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { UpdateProdutcRequestDTO } from '../../product/dto/UpdateProdutcRequestDTO';
import { Type } from 'class-transformer';
import { CreateProductRequestDTO } from '../../product/dto/CreateProductRequestDTO';

export class UpdatePostRequestDTO {
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateProductRequestDTO)
  product: UpdateProdutcRequestDTO;
}
