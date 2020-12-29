import Teacher from '../infra/typeorm/entities/Teacher';
import ICreateTeacherDTO from '../dtos/ICreateTeacherDTO';

export default interface ITeacherRepository {
  findById(id: string): Promise<Teacher | undefined>;
  create(data: ICreateTeacherDTO): Promise<Teacher>;
  save(user: Teacher): Promise<Teacher>;
}
