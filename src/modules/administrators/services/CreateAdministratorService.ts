import SchoolRepository from '@modules/school/infra/typeorm/repositories/SchoolRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { injectable, inject, container } from 'tsyringe';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Administrator from '../infra/typeorm/entities/Administrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest extends ICreateUserDTO {
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
    name,
    email,
    password,
    cpf,
    roles,
    permissions,
    school_id,
    user_id,
  }: IRequest): Promise<Administrator> {
    const schoolRepository = new SchoolRepository();
    const createUserService = container.resolve(CreateUserService);

    const admUser = await createUserService.execute({
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

    if (schoolExists.user_id !== user_id) {
      const checkEmployeeIsSchool = await this.administratorRepository.isEmployeeSchool(
        user_id,
        school_id,
      );

      if (!checkEmployeeIsSchool) {
        throw new AppError(
          'Você não pode cadastrar administradores nessa escola',
        );
      }
    }

    const administrator = await this.administratorRepository.create({
      school_id,
      user_id: admUser.id,
    });
    return administrator;
  }
}
export default CrearteAdministratorlService;
