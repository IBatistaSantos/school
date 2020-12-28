import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';

import CheckAccess from '@modules/users/infra/middlewares/verifiyRole';
import SchoolController from '../controllers/SchoolController';

const schoolRouter = Router();
const schoolController = new SchoolController();
const checkAccess = new CheckAccess();
schoolRouter.use(ensureAuthenticaded);
schoolRouter.use(checkAccess.isMaster);
schoolRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  schoolController.create,
);

export default schoolRouter;
