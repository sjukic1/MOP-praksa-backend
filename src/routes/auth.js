import express from 'express';

import AuthController from '../controllers/auth/controller';

import AuthValidationProps from '../controllers/auth/validator';

import Helper from '../lib/helpers';

const authRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /api/v1/auth/login:
 *    post:
 *      tags:
 *        - "Auth"
 *      description: Use to login user
 *      parameters:
 *        - in: body
 *          name: status
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: Success login!
 *        400:
 *          description: Wrong Username and Password Combination!
 */

authRouter.post('/login', AuthValidationProps.login, Helper.validateErrors, AuthController.login);

/**
 * @swagger
 * paths:
 *  /api/v1/auth/signup:
 *    post:
 *      tags:
 *        - "Auth"
 *      description: Create user
 *      parameters:
 *        - in: body
 *          type: object
 *          name: status
 *          required:
 *            - username
 *            - name
 *            - surname
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            name:
 *              type: string
 *            surname:
 *              type: string
 *            password:
 *              type: string
 *            description:
 *              type: string
 *      responses:
 *        200:
 *          description: User registered!
 *        500:
 *          description: Server error!
 */
authRouter.post('/signup', AuthValidationProps.signUp, Helper.validateErrors, AuthController.signUp);

export default authRouter;
