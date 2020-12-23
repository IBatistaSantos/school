import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Roles from '@modules/roles/infra/typeorm/entities/Roles';
import Permissions from '@modules/permissions/infra/typeorm/entities/Permissions';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  CPF: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Roles)
  @JoinTable()
  roles: Roles[];

  @ManyToMany(() => Permissions)
  @JoinTable()
  permissions: Permissions[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
