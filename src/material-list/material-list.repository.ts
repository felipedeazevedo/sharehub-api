import { Repository } from 'typeorm';
import { MaterialListEntity } from './entity/material-list.entity';

export interface MaterialListRepository extends Repository<MaterialListEntity> {
  this: Repository<MaterialListEntity>;
}
