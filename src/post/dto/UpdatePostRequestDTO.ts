import { ValidateNested } from 'class-validator';
import { UpdateProductRequestDTO } from '../../product/dto/UpdateProductRequestDTO';
import { Type } from 'class-transformer';

export class UpdatePostRequestDTO {
  @ValidateNested({ each: true })
  @Type(() => UpdateProductRequestDTO)
  product: UpdateProductRequestDTO;
}
