import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdministratorService from '@modules/administrators/services/CreateAdministratorService';
import { classToClass } from 'class-transformer';

export default class AdministratorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
      school_id,
    } = request.body;

    const createAdministratorService = container.resolve(
      CreateAdministratorService,
    );
    const user = await createAdministratorService.execute({
      name,
      email,
      password,
      roles,
      permissions,
      school_id,
      cpf,
    });

    return response.json(classToClass(user));
  }
}
