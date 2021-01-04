import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findByCPF(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  isProfile(user_id: string, profile: string): Promise<boolean>;
  hasPermission(user_id: string, permission: string): Promise<boolean>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  getUserByRole(roleName: string): Promise<User[]>;
}
