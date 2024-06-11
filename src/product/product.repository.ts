import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';

export interface ProductRepository extends Repository<ProductEntity> {
  this: Repository<ProductEntity>;
}
