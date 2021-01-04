import ICreateAdministratorDTO from '../dtos/ICreateAdministratorDTO';
import Administrator from '../infra/typeorm/entities/Administrator';

export default interface IAdmininstratorRepository {
  findById(id: string): Promise<Administrator | undefined>;
  create(data: ICreateAdministratorDTO): Promise<Administrator>;
  save(administrator: Administrator): Promise<Administrator>;
  isEmployeeSchool(user_id: string, school_id: string): Promise<boolean>;
}
