import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email?: string;
  cpf?: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, cpf, password }: IRequest): Promise<IResponse> {
    let user: User | undefined;
    if (cpf) {
      user = await this.userRepository.findByCPF(cpf);
      if (!user) {
        throw new AppError(
          'Esse CPF não foi encontrado, verifique seu CPF',
          401,
        );
      }
    } else if (email) {
      user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new AppError(
          'Email não encontrado, verfique emai digitado ',
          401,
        );
      }
    } else {
      throw new AppError('Informe o CPF ou email do usuário', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthticateUserService;
