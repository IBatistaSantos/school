import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ISchoolRepository from '@modules/school/repositories/ISchoolRepository';

import IAdmininstratorRepository from '@modules/administrators/repositories/IAdministratorRepository';
import ITeacherRepository from '../repositories/ITeacherRepository';

interface IRequest {
  teacher_id: string;
  user_id: string;
}

@injectable()
class ResetPasswordTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('AdministratorRepository')
    private administratorRepository: IAdmininstratorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,
  ) {}

  public async execute({ teacher_id, user_id }: IRequest): Promise<void> {
    const teacher = await this.teacherRepository.findById(teacher_id);
    if (!teacher) {
      throw new AppError('Professor não encontrado');
    }

    const user = await this.userRepository.findById(teacher.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const schoolExists = await this.schoolRepository.findById(
      teacher.school_id,
    );

    if (!schoolExists) {
      throw new AppError('Escola não encontrada');
    }

    if (schoolExists.user_id !== user_id) {
      const checkEmployeeIsSchool = await this.administratorRepository.isSchoolEmployee(
        user_id,
        teacher.school_id,
      );

      if (!checkEmployeeIsSchool) {
        throw new AppError('Você não pode resetar a senha desse professor');
      }

      const hasAccessResources = await this.userRepository.hasPermission(
        user_id,
        'Resetar senha',
      );

      if (!hasAccessResources) {
        throw new AppError(
          'Usuário não tem permissão para acessar esse recurso',
        );
      }
    }
    user.password = await this.hashProvider.generateHash('123456');
    await this.userRepository.save(user);
  }
}
export default ResetPasswordTeacherService;
