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

  public async isProfile(user_id: string, profile: string): Promise<boolean> {
    const user = await this.ormRepository.findOneOrFail({
      relations: ['roles'],
      where: { id: user_id },
    });

    const checkProfileUser = user.roles.find(role => role.name === profile);
    if (checkProfileUser) {
      return true;
    }
    if (checkProfileUser) {
      return true;
    }
    return false;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { CPF: cpf } });
    return user;
  }

  public async hasPermission(
    user_id: string,
    permission: string,
  ): Promise<boolean> {
    const user = await this.ormRepository.findOneOrFail({
      relations: ['permissions'],
      where: { id: user_id },
    });

    const checkPermissionUser = user.permissions.find(
      permissionUser => permissionUser.name === permission,
    );
    if (checkPermissionUser) {
      return true;
    }

    return false;
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
}
export default UserRepository;
