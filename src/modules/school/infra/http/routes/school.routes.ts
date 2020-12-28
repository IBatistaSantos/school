import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';

import CheckAccess from '@modules/users/infra/middlewares/verifiyRole';
import SchoolController from '../controllers/SchoolController';
import ListSchoolUserController from '../controllers/ListSchoolUserController';

const schoolRouter = Router();
const schoolController = new SchoolController();
const listSchoolUserController = new ListSchoolUserController();
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
schoolRouter.get('/', listSchoolUserController.index);

export default schoolRouter;
