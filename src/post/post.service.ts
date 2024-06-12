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
import { PostResponseDTO } from './dto/PostResponseDTO';
import { Role } from "../enums/role.enums";

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
        throw new NotFoundException('Esse usuário não existe.');
      }

      const new_post: PostEntity = this.postRepository.create({
        product: product,
        user: user,
        createdAt: new Date(),
        active: true,
      });
      return this.mapToDTO(await this.postRepository.save(new_post));
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: number) {
    return this.mapToDTO(
      await this.postRepository.findOne({
        where: { id },
        relations: ['product', 'user'],
      }),
    );
  }

  async findAll() {
    const posts: PostEntity[] = await this.postRepository.find({
      relations: ['product', 'user'],
    });
    return posts.map((post) => this.mapToDTO(post));
  }

  async update(id: number, updatePostRequestDTO: UpdatePostRequestDTO) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException(`O anúncio ${id} não existe.`);
    }

    const updatedProduct = await this.productService.update(
      post.product.id,
      updatePostRequestDTO.product,
    );

    await this.postRepository.update(id, {
      product: updatedProduct,
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

  mapToDTO(post: PostEntity): PostResponseDTO {
    return {
      id: post.id,
      actve: post.active,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      product: {
        id: post.product.id,
        title: post.product.title,
        description: post.product.description,
        price: post.product.price,
        category: post.product.category,
        condition: post.product.condition,
      },
      user: {
        id: post.user.id,
        name: post.user.name,
        registration: post.user.registration,
        phone: post.user.phone,
      },
    };
  }
}
