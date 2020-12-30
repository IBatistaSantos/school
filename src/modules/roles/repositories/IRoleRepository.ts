import User from '@modules/users/infra/typeorm/entities/User';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';
import Roles from '../infra/typeorm/entities/Roles';

export default interface IRoleRepository {
  findByName(name: string): Promise<Roles | undefined>;
  attach(user: User, role: Roles): Promise<void>;
  create(data: ICreateRoleDTO): Promise<Roles>;
  save(role: Roles): Promise<Roles>;
}
