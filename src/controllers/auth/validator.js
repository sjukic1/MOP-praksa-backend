import { body } from 'express-validator';

const MINIMAL_PASSWORD_LENGTH = 8;

export const login = [body('username', 'Invalid username').exists(), body('password', 'Minimal password length should be eight characters').isLength({ min: MINIMAL_PASSWORD_LENGTH })];

export const signUp = [
  body('username', 'Invalid username').isString(),
  body('name', 'Invalid name').isString(),
  body('surname', 'Invalid surname').isString(),
  body('password', 'Minimal password length should be eight characters').isLength({ min: MINIMAL_PASSWORD_LENGTH }),
  body('description', 'Invalid description').optional().isString(),
];

export default {
  login,
  signUp,
};
