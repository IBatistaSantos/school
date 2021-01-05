import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordTeacherService from '@modules/teachers/services/ResetPasswordTeacher';

export default class ResetPasswordTeacherController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { teacher_id } = request.params;

    const resetPasswordTeacherService = container.resolve(
      ResetPasswordTeacherService,
    );

    await resetPasswordTeacherService.execute({
      user_id: id,
      teacher_id,
    });

    return response.json({ message: 'Senha resetada com sucesso' });
  }
}
