import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { injectable, inject, container } from 'tsyringe';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ISchoolRepository from '@modules/school/repositories/ISchoolRepository';
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
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,
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
    const schoolExists = await this.schoolRepository.findById(school_id);

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

      const hasAccessResources = await this.userRepository.hasPermission(
        user_id,
        'Cadastrar Administrador',
      );

      if (!hasAccessResources) {
        throw new AppError(
          'Usuário não tem permissão para acessar esse recurso',
        );
      }
    }

    const createUserService = container.resolve(CreateUserService);
    const admUser = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
    });

    const administrator = await this.administratorRepository.create({
      school_id,
      user_id: admUser.id,
    });
    return administrator;
  }
}
export default CrearteAdministratorlService;
