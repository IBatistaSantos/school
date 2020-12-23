import { Router } from 'express';

import usersRouter from '@modules/users/infra/htttp/routes/users.routes';
import roleRouter from '@modules/roles/infra/http/routes/role.routes';
import permissionRouter from '@modules/permissions/infra/http/routes/permission.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/roles', roleRouter);
routes.use('/permissions', permissionRouter);

export default routes;
