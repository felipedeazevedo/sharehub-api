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
import { UpdateMaterialListRequestDTO } from './dto/UpdateMaterialListRequestDTO';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Material List')
@Controller('material-lists')
export class MaterialListController {
  constructor(private readonly materialListService: MaterialListService) {}

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async create(@Body() body: CreateMaterialListRequestDTO) {
    return this.materialListService.create(body);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMaterialListRequestDTO,
  ) {
    return this.materialListService.update(id, body);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialListService.findOne(id);
  }

  @Get()
  findAll() {
    return this.materialListService.findAll();
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.materialListService.delete(id);
  }
}
