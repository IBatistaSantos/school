import { injectable, inject } from 'tsyringe';
import School from '../infra/typeorm/entities/School';
import ISchoolRepository from '../repositories/ISchoolRepository';

@injectable()
class ListSchoolService {
  constructor(
    @inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,
  ) {}

  public async execute(user_id: string): Promise<School[]> {
    const school = await this.schoolRepository.findSchoolByUser(user_id);
    return school;
  }
}
export default ListSchoolService;
