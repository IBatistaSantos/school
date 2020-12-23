import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUsersByRoleService from '../../../services/ListUserStartingRole';

export default class ListUsersByRoleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { roleName } = request.params;
    const listByRoleService = container.resolve(ListUsersByRoleService);
    const user = await listByRoleService.execute(roleName);

    return response.json(classToClass(user));
  }
}
