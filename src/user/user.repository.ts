import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

export interface UserRepository extends Repository<UserEntity> {
  this: Repository<UserEntity>;
}
