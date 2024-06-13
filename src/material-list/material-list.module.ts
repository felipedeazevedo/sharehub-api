import { Module } from '@nestjs/common';
import { MaterialListController } from './material-list.controller';
import { MaterialListService } from './material-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { MaterialListItemEntity } from '../material-list-item/entity/material-list-item.entity';
import { MaterialListItemModule } from '../material-list-item/material-list-item.module';
import { UserEntity } from '../user/entity/user.entity';
import { MaterialListEntity } from './entity/material-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaterialListEntity,
      MaterialListItemEntity,
      UserEntity,
    ]),
    ProductModule,
    UserModule,
    AuthModule,
    FileModule,
    MaterialListItemModule,
  ],
  controllers: [MaterialListController],
  providers: [MaterialListService],
  exports: [MaterialListService],
})
export class MaterialListModule {}
