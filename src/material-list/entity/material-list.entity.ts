import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({
    name: 'teacher_id',
  })
  teacher: UserEntity;

  @OneToMany(
    () => MaterialListItemEntity,
    (materialListItem) => materialListItem.materialList,
    { eager: true },
  )
  items: MaterialListItemEntity[];

  @Column({
    type: 'boolean',
  })
  active: boolean;
}
