import { Module } from '@nestjs/common';
import { MaterialListController } from './material-list.controller';
import { MaterialListService } from './material-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialListEntity } from './entity/material-list.entity';
import { ProductModule } from "../product/product.module";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialListEntity]),
    ProductModule,
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [MaterialListController],
  providers: [MaterialListService],
  exports: [MaterialListService],
})
export class MaterialListModule {}
