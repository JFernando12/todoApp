import { Request, Response, Router } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { Task } from '../models';

const router = Router();

router.get(
  '/tasks/:taskId',
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    const taskId = req.params.taskId;

    const task = await Task.findOne({ _id: taskId, userId });
    res.send(task);
  }
);

export { router as routerGetTask };
