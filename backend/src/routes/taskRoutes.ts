import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '../middlewares';
import taskController from '../controllers/taskController';

const router = Router();

router.post(
  '/',
  requireAuth,
  [
    body('name').notEmpty().withMessage('name must be not empty'),
    body('description').notEmpty().withMessage('description must be not empty'),
  ],
  validateRequest,
  taskController.createTask
);

router.put(
  '/:taskId',
  requireAuth,
  [body('done').isBoolean().withMessage('done must be boolean')],
  validateRequest,
  taskController.updateTask
);
router.delete('/:taskId', requireAuth, taskController.deleteTask);
router.get('/:taskId', requireAuth, taskController.getTask);
router.get('/', requireAuth, taskController.getTasks);

export { router as routerTask };
