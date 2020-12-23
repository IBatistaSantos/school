import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import RoleController from '../controllers/RoleController';

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      permissions: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
        }),
      ),
    },
  }),
  roleController.create,
);

export default roleRouter;
