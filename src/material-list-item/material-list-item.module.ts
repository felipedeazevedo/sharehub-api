import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialListItemEntity } from './entity/material-list-item.entity';
import { MaterialListItemService } from './material-list-item.service';
import { MaterialListEntity } from '../material-list/entity/material-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialListItemEntity]),
    MaterialListEntity,
  ],
  controllers: [],
  providers: [MaterialListItemService],
  exports: [MaterialListItemService],
})
export class MaterialListItemModule {}
