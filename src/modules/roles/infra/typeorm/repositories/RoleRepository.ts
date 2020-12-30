import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Repository } from 'typeorm';
import Roles from '../entities/Roles';

class RoleRepository implements IRoleRepository {
  private ormRepository: Repository<Roles>;

  constructor() {
    this.ormRepository = getRepository(Roles);
  }

  public async attach(user: User, role: Roles): Promise<void> {
    await getRepository(User)
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user)
      .add(role);
  }

  public async findByName(name: string): Promise<Roles | undefined> {
    const role = await this.ormRepository.findOne({ where: { name } });
    return role;
  }

  public async create({ name, description }: ICreateRoleDTO): Promise<Roles> {
    const role = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(role);
    return role;
  }

  public async save(role: Roles): Promise<Roles> {
    return this.ormRepository.save(role);
  }
}

export default RoleRepository;
