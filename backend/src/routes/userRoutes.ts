import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/userController';
import { validateRequest } from '../middlewares';

const router = Router();

router.post(
  '/signup',
  [
    body('email').notEmpty().isEmail().withMessage('email must be not empty'),
    body('password').notEmpty().withMessage('password must be not empty'),
  ],
  validateRequest,
  userController.signup
);

router.post(
  '/signin',
  [
    body('email').notEmpty().isEmail().withMessage('email must be not empty'),
    body('password').notEmpty().withMessage('password must be not empty'),
  ],
  validateRequest,
  userController.signin
);

router.get('/', userController.getUsers);

export { router as routerUser };
