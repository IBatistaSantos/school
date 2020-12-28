import { Router } from 'express';

import usersRouter from '@modules/users/infra/htttp/routes/users.routes';
import roleRouter from '@modules/roles/infra/http/routes/role.routes';
import permissionRouter from '@modules/permissions/infra/http/routes/permission.routes';
import sessionRouter from '@modules/users/infra/htttp/routes/session.routes';
import schoolRouter from '@modules/school/infra/http/routes/school.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/roles', roleRouter);
routes.use('/permissions', permissionRouter);

routes.use('/school', schoolRouter);

export default routes;
