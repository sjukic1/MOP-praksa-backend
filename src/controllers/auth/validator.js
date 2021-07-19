import { body } from 'express-validator';

export const login = [];

export const signUp = [body('username', 'Invalid username').exists(), body('password', 'Invalid password').isLength({ min: 5 })];

export default {
  login,
  signUp,
};
