import { Request, Response, Router } from 'express';
import { User } from '../models';

const router = Router();

router.get('/users', async (req: Request, res: Response) => {
  const users = await User.find();

  res.send(users);
});

export { router as routerGetUsers };
