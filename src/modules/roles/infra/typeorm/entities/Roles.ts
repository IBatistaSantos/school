import Permissions from '@modules/permissions/infra/typeorm/entities/Permissions';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export default class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Permissions)
  @JoinTable()
  permissions: Permissions[];

  @UpdateDateColumn()
  updated_at: Date;
}
