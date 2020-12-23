import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRoleService from '@modules/roles/services/CreateRoleService';
import { classToClass } from 'class-transformer';

export default class RoleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, permissions } = request.body;

    const createRoleService = container.resolve(CreateRoleService);
    const role = await createRoleService.execute({
      name,
      description,
      permissions,
    });

    return response.json(classToClass(role));
  }
}
