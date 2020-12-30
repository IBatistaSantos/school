import User from '@modules/users/infra/typeorm/entities/User';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';
import { getRepository } from 'typeorm';
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
      cpf,
    });

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
export default CreateUserService;
