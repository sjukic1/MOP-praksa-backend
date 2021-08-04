import { body, query } from 'express-validator';

const MINIMAL_PASSWORD_LENGTH = 8;

export const getUser = [];

export const updateUser = [
  body('username', 'Invalid username').optional().isString(),
  body('name', 'Invalid name').optional().isString(),
  body('surname', 'Invalid surname').optional().isString(),
  body('password', 'Minimal password length should be eight characters').optional().isString().isLength({ min: MINIMAL_PASSWORD_LENGTH }),
  body('description', 'Invalid description').optional().isString(),
];

export const getUserVideos = [
  query('page', 'Page value is not correct').isNumeric(),
  query('size', 'Size value is not correct').isNumeric(),
  query('category', 'Category value is not correct').optional().isString(),
  query('order', 'Order value is not correct').optional().isString(),
  query('duration', 'Duration value is not correct').optional().isString(),
];

export default {
  getUser,
  updateUser,
  getUserVideos,
};
