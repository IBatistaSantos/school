import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePermissionService from '@modules/permissions/services/CreatePermissionsService';
import { classToClass } from 'class-transformer';

export default class PermissionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermissionService = container.resolve(CreatePermissionService);
    const permission = await createPermissionService.execute({
      name,
      description,
    });

    return response.json(classToClass(permission));
  }
}
