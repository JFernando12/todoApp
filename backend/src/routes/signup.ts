import { Request, Response, Router } from 'express';
import { User } from '../models/user';
import JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_KEY } from '../env';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExist = await User.find({ email });
  if (userExist.length > 0) {
    return res.send('User already exist');
  }

  const user = User.build({ email, password });
  await user.save();
  console.log('user', user);

  const token = JsonWebToken.sign({ id: user.id, email: user.email }, JWT_KEY);

  res.send({ token });
});

export { router as routerSignup };
