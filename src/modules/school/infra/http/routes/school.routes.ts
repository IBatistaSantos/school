import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';
import checkAccess from '@modules/users/infra/middlewares/checkRoleAccess';
import SchoolController from '../controllers/SchoolController';
import ListSchoolUserController from '../controllers/ListSchoolUserController';

const schoolRouter = Router();
const schoolController = new SchoolController();
const listSchoolUserController = new ListSchoolUserController();
schoolRouter.use(ensureAuthenticaded);

schoolRouter.use((req, response, next) => {
  checkAccess(req, response, next, 'Master').catch(error => {
    response.json({ error: { message: error.message } });
  });
});

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
