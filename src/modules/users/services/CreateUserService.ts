import User from '@modules/users/infra/typeorm/entities/User';

import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
  }: IRequest): Promise<User> {
    const hashedPassord = await this.hashProvider.generateHash(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassord,
      CPF: cpf,
    });

    return user;
  }
}

export default CreateUserService;
