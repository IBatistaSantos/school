import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';

import checkAccess from '@modules/users/infra/middlewares/checkRoleAccess';
import AdministatorController from '../controller/AdministratorController';

const administatorRouter = Router();
const administatorController = new AdministatorController();
administatorRouter.use(ensureAuthenticaded);
administatorRouter.use((request, response, next) => {
  checkAccess(request, response, next, 'Master');
});
administatorRouter.post(
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
  administatorController.create,
);

export default administatorRouter;
