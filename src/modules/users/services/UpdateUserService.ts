import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    cpf,
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

    return user;
  }
}

export default UpdateProfile;
