import { Request, Response, Router } from 'express';

const router = Router();

router.get('/tasks/:taskId', (req: Request, res: Response) => {
  res.send('Get task');
});

export { router as routerGetTask };
