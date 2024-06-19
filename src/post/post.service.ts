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

      const newPost: PostEntity = this.postRepository.create({
        product: product,
        user: user,
        createdAt: new Date(),
        active: true,
      });
      return this.mapToDTO(await this.postRepository.save(newPost));
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException('Erro ao criar o post.');
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

  async findPostsByUserId(userId: number): Promise<PostResponseDTO[]> {
    const posts: PostEntity[] = await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['product', 'user'],
    });

    return posts.map((post) => this.mapToDTO(post));
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
        price: this.convertToBrFormat(post.product.price),
        category: post.product.category,
        condition: post.product.condition,
      },
      user: {
        id: post.user.id,
        name: post.user.name,
        registration: post.user.registration,
        phone: post.user.phone,
        email: post.user.email,
      },
    };
  }

  convertToBrFormat(decimalNumber: number): string {
    return decimalNumber.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
