import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialListEntity } from '../../material-list/entity/material-list.entity';

@Entity('material_lists_itens')
export class MaterialListItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  description: string;

  @ManyToOne(() => MaterialListEntity, (materialList) => materialList.itens)
  materialList: MaterialListEntity;

  @Column({
    type: 'boolean',
  })
  mandatory: boolean;
}
