import express from 'express';

import UserController from '../controllers/user/controller';

import UserValidationProps from '../controllers/user/validator';

import Helper from '../lib/helpers';
import { validateToken } from '../lib/helpers/jwt';

const userRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /api/v1/users/me:
 *    get:
 *      tags:
 *        - "Users"
 *      description: Get information for user
 *      security:
 *        - Bearer: []
 *      responses:
 *        200:
 *          description: User informations!
 *        400:
 *          description: User not found!
 *        500:
 *          description: Server error!
 */
userRouter.get('/me', validateToken, UserValidationProps.getUser, Helper.validateErrors, UserController.getUser);
/**
 * @swagger
 * paths:
 *  /api/v1/users/update:
 *    put:
 *      tags:
 *        - "Users"
 *      description: Update user informations
 *      security:
 *        - Bearer: []
 *      parameters:
 *        - in: body
 *          type: object
 *          name: status
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
 *          description: Successfully updated user!
 *        400:
 *          description: User not found!
 *        500:
 *          description: Server error!
 */
userRouter.put('/update', validateToken, UserValidationProps.updateUser, Helper.validateErrors, UserController.updateUser);
/**
 * @swagger
 * paths:
 *  /api/v1/users/me/uploaded-videos:
 *    get:
 *      tags:
 *        - "Users"
 *      description: Get videos from user
 *      security:
 *        - Bearer: []
 *      parameters:
 *        - in: query
 *          name: category
 *        - in: query
 *          name: size
 *        - in: query
 *          name: page
 *        - in: query
 *          name: order
 *        - in: query
 *          name: duration
 *        - in: query
 *          name: q
 *      responses:
 *        200:
 *          description: Return all user videos pagged!
 *        500:
 *          description: Server error!
 */
userRouter.get('/me/uploaded-videos', validateToken, UserValidationProps.getUserVideos, Helper.validateErrors, UserController.getUserVideos);

export default userRouter;
