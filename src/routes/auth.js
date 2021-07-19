import express from 'express';

import AuthController from '../controllers/auth/controller';

import AuthValidationProps from '../controllers/auth/validator';

import Helper from '../lib/helpers';

const authRouter = express.Router();

authRouter.post('/login', AuthValidationProps.login, Helper.validateErrors, AuthController.login);
authRouter.post('/signup', AuthValidationProps.signUp, Helper.validateErrors, AuthController.signUp);

export default authRouter;
