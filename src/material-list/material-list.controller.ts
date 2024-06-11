import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateMaterialListRequestDTO } from './dto/CreateMaterialListRequestDTO';
import { MaterialListService } from './material-list.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enums';
import { RoleGuard } from '../guards/role.guard';
import { UpdateMaterialListRequestDTO } from "./dto/UpdateMaterialListRequestDTO";

@ApiTags('Material List')
@Controller('material-list')
export class MaterialListController {
  constructor() {}

  @Roles(Role.TEACHER)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() body: CreateMaterialListRequestDTO) {
    return 'hello world';
  }

  @Roles(Role.TEACHER)
  @UseGuards(RoleGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMaterialListRequestDTO,
  ) {
    return 'hello world';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return 'hello world';
  }

  @Get()
  findAll() {
    return 'hello world';
  }

  @Roles(Role.TEACHER)
  @UseGuards(RoleGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return 'hello world';
  }
}
