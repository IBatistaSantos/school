import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ISchoolRepository from '@modules/school/repositories/ISchoolRepository';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest {
  admin_id: string;
  user_id: string;
}

@injectable()
class ResetPasswordAdministratorService {
  constructor(
    @inject('AdministratorRepository')
    private administratorRepository: IAdministratorRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,
  ) {}

  public async execute({ admin_id, user_id }: IRequest): Promise<void> {
    const admin = await this.administratorRepository.findById(admin_id);

    if (!admin) {
      throw new AppError('Administrador não encontrado');
    }

    const user = await this.userRepository.findById(admin.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const schoolExists = await this.schoolRepository.findById(admin.school_id);

    if (!schoolExists) {
      throw new AppError('Escola não encontrada');
    }

    if (schoolExists.user_id !== user_id) {
      const checkEmployeeIsSchool = await this.administratorRepository.isEmployeeSchool(
        user_id,
        admin.school_id,
      );

      if (!checkEmployeeIsSchool) {
        throw new AppError('Você não pode resetar a senha desse administrador');
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
export default ResetPasswordAdministratorService;
