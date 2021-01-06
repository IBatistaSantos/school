import ICreateAdministratorDTO from '../dtos/ICreateAdministratorDTO';
import Administrator from '../infra/typeorm/entities/Administrator';

export default interface IAdmininstratorRepository {
  findById(id: string): Promise<Administrator | undefined>;
  findBySchool(school_id: string): Promise<Administrator[]>;
  create(data: ICreateAdministratorDTO): Promise<Administrator>;
  save(administrator: Administrator): Promise<Administrator>;

  isSchoolEmployee(user_id: string, school_id: string): Promise<boolean>;
}
