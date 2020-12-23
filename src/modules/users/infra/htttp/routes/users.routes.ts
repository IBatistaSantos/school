import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import ListUsersByRoleController from '../controllers/ListUserByRoleController';

const usersRouter = Router();
const userController = new UsersController();
const listUserByRoleController = new ListUsersByRoleController();

usersRouter.post(
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
    },
  }),
  userController.create,
);

usersRouter.get('/:roleName', listUserByRoleController.index);

export default usersRouter;
