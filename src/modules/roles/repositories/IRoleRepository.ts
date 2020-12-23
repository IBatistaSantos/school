import ICreateRoleDTO from '../dtos/ICreateRoleDTO';
import Roles from '../infra/typeorm/entities/Roles';

export default interface IRoleRepository {
  findByName(name: string): Promise<Roles | undefined>;
  create(data: ICreateRoleDTO): Promise<Roles>;
  save(role: Roles): Promise<Roles>;
}
