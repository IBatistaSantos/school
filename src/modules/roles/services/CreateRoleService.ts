import Permissions from '@modules/permissions/infra/typeorm/entities/Permissions';
import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Roles from '../infra/typeorm/entities/Roles';

import IRoleRepository from '../repositories/IRoleRepository';

interface IRequest {
  name: string;
  description?: string;
  permissions?: [{ name: string }];
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,

    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  public async execute({
    name,
    description,
    permissions,
  }: IRequest): Promise<Roles> {
    const roleExist = await this.roleRepository.findByName(name);

    if (roleExist) {
      throw new AppError('Perfil de usuário já existe');
    }

    const role = await this.roleRepository.create({
      name,
      description,
    });

    if (permissions) {
      let permissionExists: any[] = [];
      permissionExists = await Promise.all(
        permissions.map((permission):
          | Promise<Permissions | undefined>
          | undefined => {
          const checkExists = this.permissionRepository.findByName(
            permission.name,
          );
          if (checkExists) {
            return checkExists;
          }
          return checkExists;
        }),
      );
      role.permissions = permissionExists;

      await this.roleRepository.save(role);
    }
    return role;
  }
}

export default CreateRoleService;
