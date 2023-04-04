import { Request, Response, Router } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { Task } from '../models';

const router = Router();

interface UpdateTaskData {
  name?: string;
  description?: string;
  done?: boolean;
}

router.put(
  '/tasks/:taskId',
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    const taskId = req.params.taskId;
    const { name, description, done } = req.body;

    const data: UpdateTaskData = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (done) data.done = done;

    const task = await Task.findOneAndUpdate({ _id: taskId, userId }, data, {
      new: true,
    });
    res.send(task);
  }
);

export { router as routerUpdateTask };
