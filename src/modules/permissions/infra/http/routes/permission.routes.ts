import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import PermissionController from '../controllers/PermissionController';

const permissionRouter = Router();
const permissionController = new PermissionController();

permissionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  permissionController.create,
);

export default permissionRouter;
