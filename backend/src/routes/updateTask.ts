import { Request, Response, Router } from 'express';

const router = Router();

router.put('', (req: Request, res: Response) => {
  res.send('Update task');
});

export { router as routerUpdateTask };
