import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCondition } from '../../enums/productCondition.enum';
import { ProductCategory } from '../../enums/productCategory.enum';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 250,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Column({
    type: 'enum',
    enum: ProductCondition,
  })
  condition: ProductCondition;
}
