import CreateUserService from '@modules/users/services/CreateUserService';
import { injectable, inject, container } from 'tsyringe';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

interface IRequest {
  name: string;
  school_id: string;
  email: string;
  password: string;
  cpf: string;
  roles?: [{ name: string }];
  permissions?: [{ name: string }];
  user_id: string;
}

@injectable()
class CreateTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    roles,
    permissions,
    school_id,
    user_id,
  }: IRequest): Promise<Teacher> {
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
    });

    // const userExists = userReposotory.findById(user_id);

    const teacher = await this.teacherRepository.create({
      user_id: user.id,
      school_id,
    });

    return teacher;
  }
}
export default CreateTeacherService;
