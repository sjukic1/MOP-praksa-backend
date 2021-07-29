import { param } from 'express-validator';

export const getAllCategories = [];

export const getCategoryByName = [param('title', 'Title not defined').exists().isString()];

export default {
  getAllCategories,
  getCategoryByName,
};
