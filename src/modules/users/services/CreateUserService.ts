import User from '@modules/users/infra/typeorm/entities/User';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import Roles from '@modules/roles/infra/typeorm/entities/Roles';
import Permissions from '@modules/permissions/infra/typeorm/entities/Permissions';
import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  roles?: [{ name: string }];
  permissions?: [{ name: string }];
}

@injectable()
class CreateUserService {
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
    name,
    email,
    password,
    cpf,
    roles,
    permissions,
  }: IRequest): Promise<User> {
    const CpfExist = await this.userRepository.findByCPF(cpf);

    if (CpfExist) {
      throw new AppError('CPF já cadastrado');
    }

    const hashedPassord = await this.hashProvider.generateHash(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassord,
      CPF: cpf,
    });

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
      let rolesExists: any = [];
      rolesExists = await Promise.all(
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
      user.permissions = rolesExists;
      await this.userRepository.save(user);
    }

    return user;
  }
}
export default CreateUserService;
