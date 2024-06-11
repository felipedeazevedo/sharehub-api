import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialListRequestDTO } from './dto/CreateMaterialListRequestDTO';
import { MaterialListRepository } from "./material-list.repository";

@Injectable()
export class MaterialListService {
  constructor(
    private readonly materialListRepository: MaterialListRepository,
  ) {}

  /*async create(materialListRequestDTO: MaterialListRequestDTO) {
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
  }*/
}
