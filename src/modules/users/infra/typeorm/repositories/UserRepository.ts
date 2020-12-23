import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import IUserRepository from '../../../repositories/IUserRepository';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);
    return user;
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
    CPF,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      CPF,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
export default UserRepository;
