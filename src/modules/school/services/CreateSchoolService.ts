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
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<School> {
    const school = await this.schoolRepository.create({
      name,
      user_id,
    });

    return school;
  }
}
export default CrearteSchoolService;
