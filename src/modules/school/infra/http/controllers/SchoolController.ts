import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSchoolService from '@modules/school/services/CreateSchoolService';
import { classToClass } from 'class-transformer';

export default class SchoolController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.user;

    const createSchoolService = container.resolve(CreateSchoolService);
    const user = await createSchoolService.execute({
      name,
      user_id: id,
    });

    return response.json(classToClass(user));
  }
}
