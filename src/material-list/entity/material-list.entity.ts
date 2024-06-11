import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('material-lists')
export class MaterialListEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
