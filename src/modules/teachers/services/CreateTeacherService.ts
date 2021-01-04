import IAdmininstratorRepository from '@modules/administrators/repositories/IAdministratorRepository';
import ISchoolRepository from '@modules/school/repositories/ISchoolRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { injectable, inject, container } from 'tsyringe';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

interface IRequest {
  name: string;
  school_id: string;
  email: string;
  password: string;
  cpf: string;
  roles?: [{ name: string }];
  permissions?: [{ name: string }];
  user_id: string;
}

@injectable()
class CreateTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @inject('AdministradorRepository')
    private administratorRepository: IAdmininstratorRepository,
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
  }: IRequest): Promise<Teacher> {
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
        throw new AppError('Você não pode cadastrar professores nessa escola');
      }

      const hasAccessResources = await this.userRepository.hasPermission(
        user_id,
        'Cadastrar Professores',
      );

      if (!hasAccessResources) {
        throw new AppError(
          'Usuário não tem permissão para acessar esse recurso',
        );
      }
    }

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
    });

    const teacher = await this.teacherRepository.create({
      user_id: user.id,
      school_id,
    });

    return teacher;
  }
}
export default CreateTeacherService;
