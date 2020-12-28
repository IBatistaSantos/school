import ICreateSchoolDTO from '../dtos/ICreateSchoolDTO';
import School from '../infra/typeorm/entities/School';

export default interface ISchoolRepository {
  findName(name: string): Promise<School | undefined>;
  create(data: ICreateSchoolDTO): Promise<School>;
  save(school: School): Promise<School>;
}
