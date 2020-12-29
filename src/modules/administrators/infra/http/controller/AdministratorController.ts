import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdministratorService from '@modules/administrators/services/CreateAdministratorService';
import { classToClass } from 'class-transformer';

export default class AdministratorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { school_id } = request.body;
    const { id } = request.user;

    const createAdministratorService = container.resolve(
      CreateAdministratorService,
    );
    const user = await createAdministratorService.execute({
      school_id,
      user_id: id,
    });

    return response.json(classToClass(user));
  }
}
