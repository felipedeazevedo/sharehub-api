import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateProductRequestDTO } from './dto/CreateProductRequestDTO';
import { UpdateProductRequestDTO } from './dto/UpdateProductRequestDTO';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductRequestDTO: CreateProductRequestDTO) {
    const product_instance = this.productRepository.create({
      title: createProductRequestDTO.title,
      description: createProductRequestDTO.description,
      price: createProductRequestDTO.price,
      category: createProductRequestDTO.category,
      condition: createProductRequestDTO.condition,
    });
    return await this.productRepository.save(product_instance);
  }

  async update(
    productId: number,
    updateProductRequestDTO: UpdateProductRequestDTO,
  ) {
    await this.productRepository.update(productId, {
      title: updateProductRequestDTO.title,
      description: updateProductRequestDTO.description,
      price: updateProductRequestDTO.price,
      category: updateProductRequestDTO.category,
      condition: updateProductRequestDTO.condition,
    });

    return this.findOne(productId);
  }

  async findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }
}
