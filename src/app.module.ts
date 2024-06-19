import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { UserEntity } from './user/entity/user.entity';
import { PostEntity } from './post/entity/post.entity';
import { ProductEntity } from './product/entity/product.entity';
import { PostModule } from './post/post.module';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';
import { MaterialListModule } from './material-list/material-list.module';
import { MaterialListEntity } from './material-list/entity/material-list.entity';
import { MaterialListItemEntity } from './material-list-item/entity/material-list-item.entity';
import { MaterialListItemModule } from './material-list-item/material-list-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1000,
      },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    PostModule,
    ProductModule,
    FileModule,
    MaterialListModule,
    MaterialListItemModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        PostEntity,
        ProductEntity,
        MaterialListEntity,
        MaterialListItemEntity,
      ],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
