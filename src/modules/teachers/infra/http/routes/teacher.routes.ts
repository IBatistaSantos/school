import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';
import TeacherController from '../controller/TeacherController';
import ListTeacherController from '../controller/ListTeacherController';

const teachersRouter = Router();
const teacherController = new TeacherController();
const listTeacherController = new ListTeacherController();
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

teachersRouter.get(
  '/:school_id',
  celebrate({
    [Segments.PARAMS]: {
      school_id: Joi.string().required(),
    },
  }),
  listTeacherController.index,
);
export default teachersRouter;
