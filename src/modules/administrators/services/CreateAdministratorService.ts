import SchoolRepository from '@modules/school/infra/typeorm/repositories/SchoolRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Administrator from '../infra/typeorm/entities/Administrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest {
  school_id: string;
  user_id: string;
}

@injectable()
class CrearteAdministratorlService {
  constructor(
    @inject('AdministratorRepository')
    private administratorRepository: IAdministratorRepository,
  ) {}

  public async execute({
    school_id,
    user_id,
  }: IRequest): Promise<Administrator> {
    const userRepository = new UserRepository();
    const schoolRepository = new SchoolRepository();
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const schoolExists = await schoolRepository.findById(school_id);

    if (!schoolExists) {
      throw new AppError('Escola não encontrada');
    }

    const isAllowed = await userRepository.isAllowedResource(
      user_id,
      'Cadastrar Administrador',
    );

    if (!isAllowed) {
      throw new AppError('Usuário não tem permissão para acessar esse recurso');
    }

    const administrator = await this.administratorRepository.create({
      school_id,
      user_id,
    });
    return administrator;
  }
}
export default CrearteAdministratorlService;
