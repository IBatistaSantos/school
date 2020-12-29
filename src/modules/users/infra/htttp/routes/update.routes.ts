import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import UpdateUserController from '../controllers/UpdateUserController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const updateUserRouter = Router();
const updateUserController = new UpdateUserController();
updateUserRouter.use(ensureAuthenticated);

updateUserRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      cpf: Joi.string(),
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
  updateUserController.update,
);

export default updateUserRouter;
