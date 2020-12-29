import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateProfile from '@modules/users/services/UpdateUserService';

export default class UpdateUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, roles, permissions } = request.body;
    const { id } = request.user;

    const updateUserService = container.resolve(UpdateProfile);
    const user = await updateUserService.execute({
      name,
      email,
      password,
      cpf,
      roles,
      permissions,
      user_id: id,
    });

    return response.json(classToClass(user));
  }
}
