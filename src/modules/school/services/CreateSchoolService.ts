import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import School from '../infra/typeorm/entities/School';
import ISchoolRepository from '../repositories/ISchoolRepository';

interface IRequest {
  name: string;
  user_id: string;
}

@injectable()
class CrearteSchoolService {
  constructor(
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<School> {
    const canUserAccessResource = await this.userRepository.isProfile(
      user_id,
      'Master',
    );

    if (!canUserAccessResource) {
      throw new AppError('Usuário não pode acessar esse recurso');
    }

    const school = await this.schoolRepository.create({
      name,
      user_id,
    });

    return school;
  }
}
export default CrearteSchoolService;
