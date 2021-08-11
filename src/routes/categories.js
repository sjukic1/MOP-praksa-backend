import express from 'express';

import CategoriesController from '../controllers/categories/controller';

import CategoriesValidationProps from '../controllers/categories/validator';

import Helper from '../lib/helpers';
import { validateToken } from '../lib/helpers/jwt';

const categoriesRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /api/v1/categories:
 *    get:
 *      tags:
 *        - "Categories"
 *      description: Get all categories
 *      security:
 *        - Bearer: []
 *      responses:
 *        200:
 *          description: All categories!
 *        500:
 *          description: Server error!
 */
categoriesRouter.get('/', validateToken, CategoriesValidationProps.getAllCategories, Helper.validateErrors, CategoriesController.getAllCategories);
/**
 * @swagger
 *
 * tags:
 *   - name: "Auth"
 *   - name: "Categories"
 *   - name: "Users"
 *   - name: "Videos"
 * paths:
 *  /api/v1/categories/{title}:
 *    get:
 *      tags:
 *        - "Categories"
 *      description: Get all categories
 *      security:
 *        - Bearer: []
 *      parameters:
 *        - in: path
 *          name: title
 *      responses:
 *        200:
 *          description: Returned all categories!
 *        422:
 *          description: No category found!
 *        500:
 *          description: Server error!
 */
categoriesRouter.get('/:title', validateToken, CategoriesValidationProps.getCategoryByName, Helper.validateErrors, CategoriesController.getCategoryByName);

export default categoriesRouter;
