import ICreateSchoolDTO from '../dtos/ICreateSchoolDTO';
import School from '../infra/typeorm/entities/School';

export default interface ISchoolRepository {
  findByName(name: string): Promise<School | undefined>;
  findById(id: string): Promise<School | undefined>;
  findSchoolByUser(user_id: string): Promise<School[]>;
  create(data: ICreateSchoolDTO): Promise<School>;
  save(school: School): Promise<School>;
}
