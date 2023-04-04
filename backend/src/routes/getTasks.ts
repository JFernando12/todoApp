import { Router, Request, Response } from 'express';
import { requireAuth } from '../middlewares/require-auth';

const router = Router();

router.get('/tasks', requireAuth, async (req: Request, res: Response) => {
  console.log('Estoye en tasks', req.currentUser);
  const user = req.currentUser;

  const tasks = await Task.find({ userId: user?.id });
  res.send('All tasks from a user');
});

export { router as routerGetTasks };
