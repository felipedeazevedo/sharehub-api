import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateProductRequestDTO } from './dto/CreateProductRequestDTO';
import { UpdateProdutcRequestDTO } from './dto/UpdateProdutcRequestDTO';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductRequestDTO: CreateProductRequestDTO) {
    console.log('TESTE DTO' + JSON.stringify(createProductRequestDTO));
    const product_instance = this.productRepository.create({
      title: createProductRequestDTO.title,
      description: createProductRequestDTO.description,
      price: createProductRequestDTO.price,
      category: createProductRequestDTO.category,
      condition: createProductRequestDTO.condition,
    });
    console.log('TESTE' + JSON.stringify(product_instance));
    return await this.productRepository.save(product_instance);
  }

  async update(updateProductRequestDTO: UpdateProdutcRequestDTO) {
    await this.productRepository.update(updateProductRequestDTO.id, {
      title: updateProductRequestDTO.title,
      description: updateProductRequestDTO.description,
      price: updateProductRequestDTO.price,
      category: updateProductRequestDTO.category,
      condition: updateProductRequestDTO.condition,
    });

    return this.findOne(updateProductRequestDTO.id);
  }

  async findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }
}
