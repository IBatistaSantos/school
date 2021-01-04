import Permissions from '@modules/permissions/infra/typeorm/entities/Permissions';
import User from '@modules/users/infra/typeorm/entities/User';
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

  @ManyToMany(() => User)
  @JoinTable()
  user: User[];

  @ManyToMany(() => Permissions)
  @JoinTable()
  permissions: Permissions[];

  @UpdateDateColumn()
  updated_at: Date;
}
