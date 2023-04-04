import { Router, Request, Response } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { Task } from '../models';

const router = Router();

router.get('/tasks', requireAuth, async (req: Request, res: Response) => {
  const user = req.currentUser;

  const tasks = await Task.find({ userId: user?.id });
  res.send(tasks);
});

export { router as routerGetTasks };
