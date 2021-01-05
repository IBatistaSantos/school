import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordAdministratorService from '@modules/administrators/services/ResetPasswordAdministratorService';

export default class ResetPasswordAdministradorController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { admin_id } = request.params;

    const resetPasswordAdministratorService = container.resolve(
      ResetPasswordAdministratorService,
    );

    await resetPasswordAdministratorService.execute({
      user_id: id,
      admin_id,
    });

    return response.json({ message: 'Senha resetada com sucesso' });
  }
}
