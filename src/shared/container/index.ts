import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import '@modules/users/providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
