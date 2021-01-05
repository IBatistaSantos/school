import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';
import ResetPasswordAdministradorController from '../controller/ResetPasswordAdministradorController';

const resetPasswordAdministatorRouter = Router();
const resetPasswordAdministatorController = new ResetPasswordAdministradorController();
resetPasswordAdministatorRouter.use(ensureAuthenticaded);
resetPasswordAdministatorRouter.put(
  '/:admin_id',
  celebrate({
    [Segments.PARAMS]: {
      admin_id: Joi.string().required(),
    },
  }),
  resetPasswordAdministatorController.update,
);

export default resetPasswordAdministatorRouter;
