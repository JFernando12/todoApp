import { Request, Response, Router } from 'express';

const router = Router();

router.put('/tasks', (req: Request, res: Response) => {
  res.send('Add task');
});

export { router as routerAddTask };
