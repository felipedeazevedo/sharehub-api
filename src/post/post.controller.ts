import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostRequestDTO } from './dto/PostRequestDTO';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enums';
import { RoleGuard } from '../guards/role.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor() {}

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @UseInterceptors(FilesInterceptor('pictures'))
  @Post()
  async create(
    @Body() body: PostRequestDTO,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new FileTypeValidator({ fileType: 'pdf' }),
        ],
      }),
    )
    pictures: Array<Express.Multer.File>,
  ) {
    return 'hello world';
  }

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PostRequestDTO,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new FileTypeValidator({ fileType: 'pdf' }),
        ],
      }),
    )
    pictures: Array<Express.Multer.File>,
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
