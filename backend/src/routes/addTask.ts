import { Request, Response, Router } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { Task } from '../models';

const router = Router();

router.post('/tasks', requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id;
  const { name, description } = req.body;

  console.log(req.currentUser);

  const task = Task.build({
    name,
    description,
    done: false,
    userId,
  });
  await task.save();

  res.send(req.currentUser);
});

export { router as routerAddTask };
