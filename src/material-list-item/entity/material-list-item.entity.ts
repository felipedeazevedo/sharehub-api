import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => MaterialListEntity, (materialList) => materialList.items)
  @JoinColumn({
    name: 'material_list_id',
  })
  materialList: MaterialListEntity;

  @Column({
    type: 'boolean',
    default: true,
  })
  mandatory: boolean;
}
