import { Request, Response, NextFunction } from 'express';
import UserRepository from '../typeorm/repositories/UserRepository';

export default class checkAccess {
  public async isMaster(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = request.user;
    const userRepository = new UserRepository();
    const isRole = await userRepository.isRoleUser(id, 'Master');
    if (!isRole) {
      throw response.json({
        error: {
          message: 'Usuario não tem permissçao para acessar esse recurso',
        },
      });
    }
    next();
  }
}
