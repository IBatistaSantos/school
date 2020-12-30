import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';
import { getRepository } from 'typeorm';
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
      roles.map(async role => {
        const checkRole = await this.roleRepository.findByName(role.name);
        if (checkRole) {
          await getRepository(User)
            .createQueryBuilder()
            .relation(User, 'roles')
            .of(user)
            .add(checkRole);
        }
      });
    }

    if (permissions) {
      permissions.map(async permission => {
        const checkPermission = await this.permissionRepository.findByName(
          permission.name,
        );
        if (checkPermission) {
          await getRepository(User)
            .createQueryBuilder()
            .relation(User, 'permissions')
            .of(user)
            .add(checkPermission);
        }
      });
    }

    return user;
  }
}

export default UpdateProfile;
