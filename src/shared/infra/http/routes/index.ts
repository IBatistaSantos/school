import { Router } from 'express';

import usersRouter from '@modules/users/infra/htttp/routes/users.routes';

const routes = Router();
routes.use('/users', usersRouter);
export default routes;
