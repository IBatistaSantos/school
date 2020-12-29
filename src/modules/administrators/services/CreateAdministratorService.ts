import SchoolRepository from '@modules/school/infra/typeorm/repositories/SchoolRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { injectable, inject, container } from 'tsyringe';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Administrator from '../infra/typeorm/entities/Administrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest extends ICreateUserDTO {
  school_id: string;
}

@injectable()
class CrearteAdministratorlService {
  constructor(
    @inject('AdministratorRepository')
    private administratorRepository: IAdministratorRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    roles,
    permissions,
    school_id,
  }: IRequest): Promise<Administrator> {
    const schoolRepository = new SchoolRepository();

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
    });

    const schoolExists = await schoolRepository.findById(school_id);

    if (!schoolExists) {
      throw new AppError('Escola não encontrada');
    }

    const administrator = await this.administratorRepository.create({
      school_id,
      user_id: user.id,
    });
    return administrator;
  }
}
export default CrearteAdministratorlService;
