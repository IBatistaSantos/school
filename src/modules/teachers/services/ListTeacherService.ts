import IAdmininstratorRepository from '@modules/administrators/repositories/IAdministratorRepository';
import ISchoolRepository from '@modules/school/repositories/ISchoolRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

interface IRequest {
  school_id: string;
  user_id: string;
}

@injectable()
class ListTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @inject('AdministratorRepository')
    private administratorRepository: IAdmininstratorRepository,
  ) {}

  public async execute({ school_id, user_id }: IRequest): Promise<Teacher[]> {
    const schoolExist = await this.schoolRepository.findById(school_id);

    if (!schoolExist) {
      throw new AppError('Escola não encontrada');
    }

    if (schoolExist.user_id !== user_id) {
      const checkEmployeeIsSchool = await this.administratorRepository.isEmployeeSchool(
        user_id,
        school_id,
      );

      if (!checkEmployeeIsSchool) {
        throw new AppError(
          'Você não pode visualizar os professores dessa escola',
        );
      }
    }
    const teachers = await this.teacherRepository.findBySchool(school_id);
    return teachers;
  }
}
export default ListTeacherService;
