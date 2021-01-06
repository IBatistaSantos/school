import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTeacherService from '@modules/teachers/services/ListTeacherService';
import { classToClass } from 'class-transformer';

export default class ListTeacherController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { school_id } = request.params;

    const listTeacherService = container.resolve(ListTeacherService);
    const teacher = await listTeacherService.execute({
      school_id,
      user_id: id,
    });

    return response.json(classToClass(teacher));
  }
}
