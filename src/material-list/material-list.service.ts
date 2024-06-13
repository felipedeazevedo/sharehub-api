import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaterialListRequestDTO } from './dto/CreateMaterialListRequestDTO';
import { MaterialListRepository } from './material-list.repository';
import { UpdateMaterialListRequestDTO } from './dto/UpdateMaterialListRequestDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialListItemService } from '../material-list-item/material-list-item.service';
import { UserService } from '../user/user.service';
import { MaterialListEntity } from './entity/material-list.entity';

@Injectable()
export class MaterialListService {
  constructor(
    @InjectRepository(MaterialListEntity)
    private readonly materialListRepository: MaterialListRepository,
    private readonly materiaListItemService: MaterialListItemService,
    private readonly userService: UserService,
  ) {}

  async create(createMaterialListRequestDTO: CreateMaterialListRequestDTO) {
    const { semester, discipline, teacherId, items } =
      createMaterialListRequestDTO;

    const teacher = await this.userService.findOne(teacherId);
    if (!teacher) {
      throw new Error('Esse usuário não existe.');
    }

    const materialList = new MaterialListEntity();
    materialList.semester = semester;
    materialList.discipline = discipline;
    materialList.teacher = teacher;
    materialList.active = true;

    const savedMaterialList =
      await this.materialListRepository.save(materialList);

    for (const itemDto of items) {
      await this.materiaListItemService.create(itemDto, savedMaterialList);
    }

    return await this.materialListRepository.findOne({
      where: { id: savedMaterialList.id },
      relations: ['items'],
    });
  }

  async findOne(id: number): Promise<MaterialListEntity | undefined> {
    const materialList = await this.materialListRepository.findOneBy({ id });

    if (!materialList) {
      throw new NotFoundException(`Material list with ID ${id} not found`);
    }

    return materialList;
  }

  async findAll(): Promise<MaterialListEntity[]> {
    return await this.materialListRepository.find();
  }

  async update(
    id: number,
    materialListRequestDTO: UpdateMaterialListRequestDTO,
  ): Promise<MaterialListEntity> {
    const { semester, discipline, teacherId, items } = materialListRequestDTO;

    const materialList = await this.findOne(id);

    if (!materialList) {
      throw new NotFoundException(`Material list with ID ${id} not found`);
    }

    materialList.semester = semester;
    materialList.discipline = discipline;

    if (teacherId) {
      const teacher = await this.userService.findOne(teacherId);
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }
      materialList.teacher = teacher;
    }

    const updatedMaterialList =
      await this.materialListRepository.save(materialList);

    if (items && items.length > 0) {
      await this.materiaListItemService.deleteByMaterialList(
        updatedMaterialList,
      );

      for (const itemDto of items) {
        await this.materiaListItemService.create(itemDto, updatedMaterialList);
      }
    }

    return await this.materialListRepository.findOne({
      where: { id: updatedMaterialList.id },
    });
  }

  async delete(id: number): Promise<void> {
    const materialList = await this.materialListRepository.findOneBy({ id });

    if (!materialList) {
      throw new NotFoundException(`Material list with ID ${id} not found`);
    }

    await this.materialListRepository.remove(materialList);
  }

  async exists(id: number): Promise<boolean> {
    const materialList = await this.materialListRepository.findOneBy({ id });
    return !!materialList;
  }
}
