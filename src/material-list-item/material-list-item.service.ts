import { Injectable } from '@nestjs/common';
import { MaterialListItemRepository } from './material-list-item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialListItemEntity } from './entity/material-list-item.entity';
import { MaterialListItemRequestDTO } from './dto/MaterialListItemRequestDTO';
import { MaterialListEntity } from '../material-list/entity/material-list.entity';

@Injectable()
export class MaterialListItemService {
  constructor(
    @InjectRepository(MaterialListItemEntity)
    private readonly materialListItemRepository: MaterialListItemRepository,
  ) {}

  async create(
    materialListItemRequestDTO: MaterialListItemRequestDTO,
    materialList: MaterialListEntity,
  ) {
    console.log(materialListItemRequestDTO);
    const materialListItem = new MaterialListItemEntity();
    materialListItem.name = materialListItemRequestDTO.name;
    materialListItem.description = materialListItemRequestDTO.description;
    console.log(Boolean(materialListItemRequestDTO.mandatory));
    materialListItem.mandatory = materialListItemRequestDTO.mandatory;
    materialListItem.materialList = materialList;

    await this.materialListItemRepository.save(materialListItem);
  }

  async deleteByMaterialList(materialList: MaterialListEntity): Promise<void> {
    await this.materialListItemRepository.delete({
      materialList: materialList,
    });
  }
}
