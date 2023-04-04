import { Request, Response, Router } from 'express';

const router = Router();

router.delete('/tasks/:taskId', (req: Request, res: Response) => {
  res.send('Update task');
});

export { router as routerDeleteTask };
