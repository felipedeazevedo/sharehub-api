import { Repository } from 'typeorm';
import { PostEntity } from './entity/post.entity';

export interface PostRepository extends Repository<PostEntity> {
  this: Repository<PostEntity>;
}
