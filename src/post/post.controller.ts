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
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdatePostRequestDTO } from './dto/UpdatePostRequestDTO';
import { AuthGuard } from '../guards/auth.guard';
import { FileService } from '../file/file.service';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly fileService: FileService,
  ) {}

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('pictures'))
  @Post()
  async create(@Body() body: CreatePostRequestDTO) {
    return this.postService.create(body);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostRequestDTO,
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
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Post(':id/pictures')
  @UseInterceptors(FilesInterceptor('pictures'))
  async createPostPictures(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    pictures: Express.Multer.File[],
  ) {
    await this.fileService.upload(pictures, id);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id/pictures')
  async getPostPictures(@Param('id', ParseIntPipe) postId: number) {
    return await this.fileService.getImagesByPostId(postId);
  }

  /**
   *     @UploadedFiles(
   *       new ParseFilePipe({
   *         validators: [
   *           new MaxFileSizeValidator({ maxSize: 1000 }),
   *           new FileTypeValidator({ fileType: 'image/jpeg' }),
   *           new FileTypeValidator({ fileType: 'pdf' }),
   *         ],
   *       }),
   *     )
   *     pictures: Array<Express.Multer.File>,
   */
}
