import express from 'express';

import UserController from '../controllers/user/controller';

import UserValidationProps from '../controllers/user/validator';

import Helper from '../lib/helpers';
import { validateToken } from '../lib/helpers/jwt';

const userRouter = express.Router();

userRouter.get('/me', validateToken, UserValidationProps.getUser, Helper.validateErrors, UserController.getUser);
userRouter.put('/update', validateToken, UserValidationProps.updateUser, Helper.validateErrors, UserController.updateUser);
userRouter.get('/me/uploaded-videos', validateToken, UserValidationProps.getUserVideos, Helper.validateErrors, UserController.getUserVideos);

export default userRouter;
