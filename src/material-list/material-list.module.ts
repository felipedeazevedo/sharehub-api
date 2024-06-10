import { Module } from '@nestjs/common';
import { MaterialListController } from './material-list.controller';
import { MaterialListService } from './material-list.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaterialListController],
  providers: [MaterialListService],
  exports: [MaterialListService],
})
export class MaterialListModule {}
