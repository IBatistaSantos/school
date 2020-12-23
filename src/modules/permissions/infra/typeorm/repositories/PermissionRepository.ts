import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';
import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';
import { getRepository, Repository } from 'typeorm';
import Permission from '../entities/Permissions';

class PermissionRepository implements IPermissionRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const role = await this.ormRepository.findOne({ where: { name } });
    return role;
  }

  public async create({
    name,
    description,
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(permission);
    return permission;
  }

  public async save(permission: Permission): Promise<Permission> {
    return this.ormRepository.save(permission);
  }
}

export default PermissionRepository;
