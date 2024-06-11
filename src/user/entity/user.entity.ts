import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../enums/role.enums';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 60,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  registration: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 60,
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  type: Role;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  phone: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date;
}
