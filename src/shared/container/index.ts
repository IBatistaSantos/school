import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import '@modules/users/providers';

import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import RoleRepository from '@modules/roles/infra/typeorm/repositories/RoleRepository';

import IPermissionRepository from '@modules/permissions/repositories/IPermissionRepository';
import PermissionRepository from '@modules/permissions/infra/typeorm/repositories/PermissionRepository';

import ISchoolRepository from '@modules/school/repositories/ISchoolRepository';
import SchoolRepository from '@modules/school/infra/typeorm/repositories/SchoolRepository';
import IAdmininstratorRepository from '@modules/administrators/repositories/IAdministratorRepository';
import AdministratorRepository from '@modules/administrators/infra/typeorm/repositories/AdministratorRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);

container.registerSingleton<IPermissionRepository>(
  'PermissionRepository',
  PermissionRepository,
);

container.registerSingleton<ISchoolRepository>(
  'SchoolRepository',
  SchoolRepository,
);
container.registerSingleton<IAdmininstratorRepository>(
  'AdministratorRepository',
  AdministratorRepository,
);
