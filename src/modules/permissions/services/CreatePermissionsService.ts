import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Permissions from '../infra/typeorm/entities/Permissions';
import IPermissionRepository from '../repositories/IPermissionRepository';

interface IRequest {
  name: string;
  description?: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Permissions> {
    const permissionExist = await this.permissionRepository.findByName(name);

    if (permissionExist) {
      throw new AppError('Permissão já existe');
    }

    const permission = await this.permissionRepository.create({
      name,
      description,
    });

    return permission;
  }
}

export default CreatePermissionService;
