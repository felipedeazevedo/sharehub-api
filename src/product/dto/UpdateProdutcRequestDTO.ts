import { CreateProductRequestDTO } from './CreateProductRequestDTO';
import { IsNumber } from 'class-validator';

export class UpdateProdutcRequestDTO extends CreateProductRequestDTO {
  @IsNumber()
  id: number;
}
