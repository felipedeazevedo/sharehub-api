import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialListRequestDTO } from './dto/CreateMaterialListRequestDTO';
import { MaterialListRepository } from './material-list.repository';
import { UpdateMaterialListRequestDTO } from './dto/UpdateMaterialListRequestDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialListEntity } from './entity/material-list.entity';
import { MaterialListItemService } from '../material-list-item/material-list-item.service';
import { UserService } from '../user/user.service';
import { MaterialListItemEntity } from '../material-list-item/entity/material-list-item.entity';
import { Role } from '../enums/role.enums';

@Injectable()
export class MaterialListService {
  constructor(
    @InjectRepository(MaterialListEntity)
    private readonly materialListRepository: MaterialListRepository,
    private readonly materiaListItemService: MaterialListItemService,
    private readonly userService: UserService,
  ) {}

  async create(createMaterialListRequestDTO: CreateMaterialListRequestDTO) {
    console.log(createMaterialListRequestDTO);
    const { semester, discipline, teacherId, items } =
      createMaterialListRequestDTO;

    const teacher = await this.userService.findOne(teacherId);
    if (!teacher) {
      throw new Error('Esse usuário não existe.');
    }

    const newMaterialList: MaterialListEntity =
      this.materialListRepository.create({
        semester: semester,
        discipline: discipline,
        teacher: teacher,
      });

    const savedMaterialList =
      await this.materialListRepository.save(newMaterialList);

    // Create and save the material list items
    for (const itemDto of items) {
      const materialListItem = new MaterialListItemEntity();
      materialListItem.name = itemDto.name;
      materialListItem.description = itemDto.description;
      materialListItem.mandatory = itemDto.mandatory;
      materialListItem.materialList = savedMaterialList;

      await this.materialListRepository.save(materialListItem);
    }

    // Return the complete material list with items
    return await this.materialListRepository.findOne({
      where: { id: savedMaterialList.id },
      relations: ['materialListItems'],
    });
  }

  async findOne(id: number) {
    return 'Hello world';
  }

  async findAll() {
    return 'Hello world';
  }

  async update(
    id: number,
    materialListRequestDTO: UpdateMaterialListRequestDTO,
  ) {
    return 'Hello world';
  }

  async delete(id: number) {
    return 'Hello world';
  }

  async exists(id: number) {
    return 'Hello world';
  }
}
