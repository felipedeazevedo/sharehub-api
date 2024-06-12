import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { MaterialListItemEntity } from '../../material-list-item/entity/material-list-item.entity';

@Entity('material_lists')
export class MaterialListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  semester: number;

  @Column({
    type: 'varchar',
    length: 30,
  })
  discipline: string;

  @ManyToOne(() => UserEntity)
  teacher: UserEntity;

  @OneToMany(
    () => MaterialListItemEntity,
    (materialListItem) => materialListItem.materialList,
  )
  itens: MaterialListItemEntity[];

  @Column({
    type: 'boolean',
  })
  active: boolean;
}
