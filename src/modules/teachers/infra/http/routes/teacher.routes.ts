import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';
import TeacherController from '../controller/TeacherController';

const teachersRouter = Router();
const teacherController = new TeacherController();
teachersRouter.use(ensureAuthenticaded);
teachersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      roles: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
        }),
      ),
      permissions: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
        }),
      ),
      school_id: Joi.string().required(),
    },
  }),
  teacherController.create,
);
export default teachersRouter;
