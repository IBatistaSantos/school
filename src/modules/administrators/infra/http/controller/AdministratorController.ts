import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdministratorService from '@modules/administrators/services/CreateAdministratorService';
import ListAdministratorService from '@modules/administrators/services/ListAdministratorService';
import { classToClass } from 'class-transformer';

export default class AdministratorController {
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
      user_id: id,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { school_id } = request.params;

    const listAdministratorService = container.resolve(
      ListAdministratorService,
    );
    const user = await listAdministratorService.execute({
      school_id,
      user_id: id,
    });

    return response.json(classToClass(user));
  }
}
