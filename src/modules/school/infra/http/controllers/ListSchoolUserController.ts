import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListSchoolService from '@modules/school/services/ListSchoolUserService';

export default class ListSchoolUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listSchoolUserService = container.resolve(ListSchoolService);
    const listSchool = await listSchoolUserService.execute(id);

    return response.json(classToClass(listSchool));
  }
}
