import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../typeorm/repositories/UserRepository';

export default async function checkAccess(
  request: Request,
  response: Response,
  next: NextFunction,
  roleName: string,
): Promise<void> {
  const { id } = request.user;
  const userRepository = new UserRepository();

  if (roleName) {
    const isRole = await userRepository.isProfile(id, roleName);

    if (!isRole) {
      throw new AppError('Usuário não tem permissão para acessar esse recurso');
    }
    next();
  }
}
