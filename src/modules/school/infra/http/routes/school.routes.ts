import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';
import SchoolController from '../controllers/SchoolController';
import ListSchoolUserController from '../controllers/ListSchoolUserController';

const schoolRouter = Router();
const schoolController = new SchoolController();
const listSchoolUserController = new ListSchoolUserController();
schoolRouter.use(ensureAuthenticaded);

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
