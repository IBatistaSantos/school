import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';
import { classToClass } from 'class-transformer';

export default class TeacherController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
      school_id,
    } = request.body;

    const createTeacherService = container.resolve(CreateTeacherService);
    const teacher = await createTeacherService.execute({
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
      school_id,
      user_id: id,
    });

    return response.json(classToClass(teacher));
  }
}
