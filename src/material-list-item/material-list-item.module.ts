import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialListItemEntity } from './entity/material-list-item.entity';
import { MaterialListItemService } from './material-list-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialListItemEntity])],
  controllers: [],
  providers: [MaterialListItemService],
  exports: [MaterialListItemService],
})
export class MaterialListItemModule {}
