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
import { PostRequestDTO } from './dto/PostRequestDTO';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enums';
import { RoleGuard } from '../guards/role.guard';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor() {}

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() body: PostRequestDTO) {
    return 'hello world';
  }

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PostRequestDTO,
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

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return 'hello world';
  }
}
