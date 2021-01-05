import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaded from '@modules/users/infra/middlewares/ensureAuthenticated';
import ResetPasswordTeacherController from '../controller/ResetPasswordTeacherController';

const resetPasswordTeacherRouter = Router();
const resetPasswordTeacherController = new ResetPasswordTeacherController();
resetPasswordTeacherRouter.use(ensureAuthenticaded);
resetPasswordTeacherRouter.put(
  '/:teacher_id',
  celebrate({
    [Segments.PARAMS]: {
      teacher_id: Joi.string().required(),
    },
  }),
  resetPasswordTeacherController.update,
);

export default resetPasswordTeacherRouter;
