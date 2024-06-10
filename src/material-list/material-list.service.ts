import { Injectable, NotFoundException } from '@nestjs/common';
import { MaterialListRequestDTO } from './dto/MaterialListRequestDTO';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterialListService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(materialListRequestDTO: MaterialListRequestDTO) {
    return 'Hello world';
  }

  async findOne(id: number) {
    return 'Hello world';
  }

  async findAll() {
    return 'Hello world';
  }

  async update(id: number, materialListRequestDTO: MaterialListRequestDTO) {
    return 'Hello world';
  }

  async delete(id: number) {
    return 'Hello world';
  }

  async exists(id: number) {
    return 'Hello world';
  }
}
