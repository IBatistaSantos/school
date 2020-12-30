import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';
import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Repository } from 'typeorm';
import Permissions from '../entities/Permissions';

class PermissionRepository implements IPermissionRepository {
  private ormRepository: Repository<Permissions>;

  constructor() {
    this.ormRepository = getRepository(Permissions);
  }

  public async findByName(name: string): Promise<Permissions | undefined> {
    const permission = await this.ormRepository.findOne({ where: { name } });
    return permission;
  }

  public async create({
    name,
    description,
  }: ICreatePermissionDTO): Promise<Permissions> {
    const permission = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(permission);
    return permission;
  }

  public async save(permission: Permissions): Promise<Permissions> {
    return this.ormRepository.save(permission);
  }

  public async attach(user: User, role: Permissions): Promise<void> {
    await getRepository(User)
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user)
      .add(role);
  }
}

export default PermissionRepository;
