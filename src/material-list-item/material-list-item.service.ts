import { Injectable } from '@nestjs/common';
import { MaterialListItemRepository } from './material-list-item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialListItemEntity } from './entity/material-list-item.entity';
import { MaterialListItemRequestDTO } from './dto/MaterialListItemRequestDTO';

@Injectable()
export class MaterialListItemService {
  constructor(
    @InjectRepository(MaterialListItemEntity)
    private readonly materialListItemRepository: MaterialListItemRepository,
  ) {}

  async create(materialListItemRequestDTO: MaterialListItemRequestDTO) {}
}
