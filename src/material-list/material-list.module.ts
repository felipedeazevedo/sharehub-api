import { Module } from '@nestjs/common';
import { MaterialListController } from './material-list.controller';
import { MaterialListService } from './material-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialListEntity } from './entity/material-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialListEntity])],
  controllers: [MaterialListController],
  providers: [MaterialListService],
  exports: [MaterialListService],
})
export class MaterialListModule {}
