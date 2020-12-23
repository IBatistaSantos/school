import User from '@modules/users/infra/typeorm/entities/User';

import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class LisrUsersByRoleService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(roleName: string): Promise<User[] | undefined> {
    const user = await this.userRepository.getUserByRole(roleName);
    return user;
  }
}
export default LisrUsersByRoleService;
