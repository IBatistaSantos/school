import User from '@modules/users/infra/typeorm/entities/User';
import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';
import Permissions from '../infra/typeorm/entities/Permissions';

export default interface IPermissionRepository {
  findByName(name: string): Promise<Permissions | undefined>;
  create(data: ICreatePermissionDTO): Promise<Permissions>;
  save(permission: Permissions): Promise<Permissions>;
  attach(user: User, permission: Permissions): Promise<void>;
}
