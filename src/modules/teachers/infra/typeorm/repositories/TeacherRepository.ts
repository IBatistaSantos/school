import { getRepository, Repository } from 'typeorm';
import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';
import ICreateTeacherDTO from '@modules/teachers/dtos/ICreateTeacherDTO';
import Teacher from '../entities/Teacher';

class TeacherRepository implements ITeacherRepository {
  private ormRepository: Repository<Teacher>;

  constructor() {
    this.ormRepository = getRepository(Teacher);
  }

  public async findById(id: string): Promise<Teacher | undefined> {
    const teacher = this.ormRepository.findOne(id);
    return teacher;
  }

  public async findBySchool(school_id: string): Promise<Teacher[]> {
    const teachers = await this.ormRepository.find({
      where: { school_id },
    });
    return teachers;
  }

  public async create({
    school_id,
    user_id,
  }: ICreateTeacherDTO): Promise<Teacher> {
    const teacher = this.ormRepository.create({
      school_id,
      user_id,
    });
    await this.ormRepository.save(teacher);
    return teacher;
  }

  public async save(teacher: Teacher): Promise<Teacher> {
    return this.ormRepository.save(teacher);
  }
}
export default TeacherRepository;
