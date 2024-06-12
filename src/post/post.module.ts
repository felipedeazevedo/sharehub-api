import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { ProductEntity } from '../product/entity/product.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { ProductService } from '../product/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, ProductEntity, UserEntity]),
    ProductModule,
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
