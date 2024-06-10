import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRequestDTO } from './dto/PostRequestDTO';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userRequestDTO: PostRequestDTO) {
    return 'Hello world';
  }

  async findOne(id: number) {
    return 'Hello world';
  }

  async findAll() {
    return 'Hello world';
  }

  async update(id: number, userRequestDTO: PostRequestDTO) {
    return 'Hello world';
  }

  async delete(id: number) {
    return 'Hello world';
  }

  async exists(id: number) {
    return 'Hello world';
  }
}
