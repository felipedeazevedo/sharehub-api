import { Repository } from 'typeorm';
import { MaterialListItemEntity } from './entity/material-list-item.entity';

export interface MaterialListItemRepository
  extends Repository<MaterialListItemEntity> {
  this: Repository<MaterialListItemEntity>;
}
