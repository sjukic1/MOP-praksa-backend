import express from 'express';

import CategoriesController from '../controllers/categories/controller';

import CategoriesValidationProps from '../controllers/categories/validator';

import Helper from '../lib/helpers';
import { validateToken } from '../lib/helpers/jwt';

const categoriesRouter = express.Router();

categoriesRouter.get('/', validateToken, CategoriesValidationProps.getAllCategories, Helper.validateErrors, CategoriesController.getAllCategories);
categoriesRouter.get('/:title', validateToken, CategoriesValidationProps.getCategoryByName, Helper.validateErrors, CategoriesController.getCategoryByName);

export default categoriesRouter;
