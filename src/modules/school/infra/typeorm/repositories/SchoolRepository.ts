import { getRepository, Repository } from 'typeorm';
import ICreateSchoolDTO from '@modules/school/dtos/ICreateSchoolDTO';
import ISchoolRepository from '../../../repositories/ISchoolRepository';
import School from '../entities/School';

class SchoolRepository implements ISchoolRepository {
  private ormRepository: Repository<School>;

  constructor() {
    this.ormRepository = getRepository(School);
  }

  public async findName(name: string): Promise<School | undefined> {
    const user = this.ormRepository.findOne({ where: { name } });
    return user;
  }

  public async create({ name, user_id }: ICreateSchoolDTO): Promise<School> {
    const user = this.ormRepository.create({
      name,
      user_id,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(school: School): Promise<School> {
    return this.ormRepository.save(school);
  }
}
export default SchoolRepository;
