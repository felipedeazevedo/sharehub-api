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
import { CreatePostRequestDTO } from './dto/CreatePostRequestDTO';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enums';
import { RoleGuard } from '../guards/role.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UpdatePostRequestDTO } from './dto/UpdatePostRequestDTO';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @UseInterceptors(FilesInterceptor('pictures'))
  @Post()
  async create(
    @Body() body: CreatePostRequestDTO,
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
    return this.postService.create(body);
  }

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostRequestDTO,
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
    return this.postService.update(id, body);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Roles(Role.STUDENT)
  @UseGuards(RoleGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
