import { ProductReponseDTO } from '../../product/dto/ProductReponseDTO';
import { UserResponseDTO } from '../../user/dto/UserResponseDTO';

export class PostResponseDTO {
  id: number;
  actve: boolean;
  createdAt: Date;
  updatedAt: Date;
  product: ProductReponseDTO;
  user: UserResponseDTO;
}
