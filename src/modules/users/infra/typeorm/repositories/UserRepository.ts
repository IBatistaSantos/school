import Permissions from '@modules/permissions/infra/typeorm/entities/Permissions';
import Roles from '@modules/roles/infra/typeorm/entities/Roles';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import IUserRepository from '../../../repositories/IUserRepository';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ id });
    return user;
  }

  public async isAllowedResource(
    user_id: string,
    action: string,
  ): Promise<boolean> {
    const user = await this.ormRepository.findOneOrFail({
      relations: ['roles', 'permissions'],
      where: { id: user_id },
    });

    const checkUserIsMaster = user.roles.find(role => role.name === 'Master');
    if (checkUserIsMaster) {
      return true;
    }

    const checkPermission = user.permissions.find(
      permission => permission.name === action,
    );

    if (checkPermission) {
      return true;
    }

    return false;
  }

  public async isRoleUser(user_id: string, roleName: string): Promise<boolean> {
    const user = await this.ormRepository.findOneOrFail({
      relations: ['roles'],
      where: { id: user_id },
    });

    const checkUserIsMaster = user.roles.find(role => role.name === 'Master');
    if (checkUserIsMaster) {
      return true;
    }

    const checkRoleUser = user.roles.find(role => role.name === roleName);

    if (checkRoleUser) {
      return true;
    }
    return false;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { CPF: cpf } });
    return user;
  }

  public async getUserByRole(roleName: string): Promise<User[]> {
    const user = await this.ormRepository
      .createQueryBuilder('users')
      .innerJoin('users.roles', 'role', 'role.name = :name', {
        name: roleName,
      })
      .getMany();

    return user;
  }

  public async create({
    name,
    email,
    password,
    cpf,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      CPF: cpf,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async attachRole(user: User, role: Roles): Promise<void> {
    await getRepository(User)
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user)
      .add(role);
  }

  public async attachPermission(
    user: User,
    permission: Permissions,
  ): Promise<void> {
    await getRepository(User)
      .createQueryBuilder()
      .relation(User, 'permission')
      .of(user)
      .add(permission);
  }
}
export default UserRepository;
