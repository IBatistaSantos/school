import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findByCPF(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  isRoleUser(user_id: string, roleName: string): Promise<boolean>;
  isAllowedResource(user_id: string, action: string): Promise<boolean>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  getUserByRole(roleName: string): Promise<User[]>;
}
