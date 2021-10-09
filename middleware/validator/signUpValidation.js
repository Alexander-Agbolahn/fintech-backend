import { check } from 'express-validator/check';
import displayErrors from './errorMessages';

const userInput = [
  check('name').not().isEmpty().withMessage('First name cannot be empty'),
  check('name').isAlpha().trim().withMessage('First name can only contain letters'),
  check('email').not().isEmpty().withMessage('Email cannot be empty'),
  check('email').isEmail().trim().withMessage('Input a valid email address'),
  check('password').not().isEmpty().withMessage('Password cannot be empty'),
  check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
  displayErrors,
];

export default userInput;
