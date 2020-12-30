import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';

import Roles from '@modules/roles/infra/typeorm/entities/Roles';
import Permissions from '@modules/permissions/infra/typeorm/entities/Permissions';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  cpf: string;
  roles?: [{ name: string }];
  permissions?: [{ name: string }];
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RoleRepository')
    private roleRepository: IRoleRepository,

    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    cpf,
    roles,
    permissions,
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    user.name = name;
    user.email = email;
    user.CPF = cpf;

    if (password && !old_password) {
      throw new AppError('As senhas não conferem ');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    if (roles) {
      let rolesExists: any[] = [];
      rolesExists = await Promise.all(
        roles.map((role): Promise<Roles | undefined> | undefined => {
          const checkExists = this.roleRepository.findByName(role.name);
          if (checkExists) {
            return checkExists;
          }
          return checkExists;
        }),
      );
      user.roles = rolesExists;
      await this.userRepository.save(user);
    }

    if (permissions) {
      let permissionsExists: any[] = [];
      permissionsExists = await Promise.all(
        permissions.map((role):
          | Promise<Permissions | undefined>
          | undefined => {
          const checkExists = this.permissionRepository.findByName(role.name);
          if (checkExists) {
            return checkExists;
          }
          return checkExists;
        }),
      );
      user.permissions = permissionsExists;
      await this.userRepository.save(user);
    }

    return user;
  }
}

export default UpdateProfile;
