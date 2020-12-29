import { getRepository, Repository } from 'typeorm';
import ICreateSchoolDTO from '@modules/school/dtos/ICreateSchoolDTO';
import ISchoolRepository from '../../../repositories/ISchoolRepository';
import School from '../entities/School';

class SchoolRepository implements ISchoolRepository {
  private ormRepository: Repository<School>;

  constructor() {
    this.ormRepository = getRepository(School);
  }

  public async findByName(name: string): Promise<School | undefined> {
    const school = this.ormRepository.findOne({ where: { name } });
    return school;
  }

  public async findById(id: string): Promise<School | undefined> {
    const school = this.ormRepository.findOne({ where: { id } });
    return school;
  }

  public async findSchoolByUser(user_id: string): Promise<School[]> {
    const school = this.ormRepository.find({ where: { user_id } });
    return school;
  }

  public async create({ name, user_id }: ICreateSchoolDTO): Promise<School> {
    const school = this.ormRepository.create({
      name,
      user_id,
    });
    await this.ormRepository.save(school);
    return school;
  }

  public async save(school: School): Promise<School> {
    return this.ormRepository.save(school);
  }
}
export default SchoolRepository;
