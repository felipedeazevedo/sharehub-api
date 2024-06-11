import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostRequestDTO } from './dto/CreatePostRequestDTO';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { UpdatePostRequestDTO } from './dto/UpdatePostRequestDTO';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: PostRepository,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(createPostRequestDTO: CreatePostRequestDTO) {
    try {
      const product = await this.productService.create(
        createPostRequestDTO.product,
      );
      const user = await this.userService.findOne(createPostRequestDTO.userId);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      const new_post: PostEntity = this.postRepository.create({
        product: product,
        user: user,
        createdAt: new Date(),
      });
      return await this.postRepository.save(new_post);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async findAll() {
    return this.postRepository.find();
  }

  async update(id: number, updatePostRequestDTO: UpdatePostRequestDTO) {
    await this.exists(id);

    const product = await this.productService.update(
      updatePostRequestDTO.product,
    );

    await this.postRepository.update(id, {
      product: product,
      updatedAt: new Date(),
    });

    return this.findOne(id);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.postRepository.delete(id);
  }

  async exists(id: number) {
    if (
      !(await this.postRepository.exists({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`O anúncio ${id} não existe.`);
    }
  }
}
