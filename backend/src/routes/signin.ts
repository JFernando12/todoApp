import { Request, Response, Router } from 'express';
import JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_KEY } from '../env';
import { User } from '../models';

const router = Router();

router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log('headers', req.headers);

  if (!user) {
    return res.send('User does not exist');
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.send('Credentials are incorrects');
  }

  const token = JsonWebToken.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_KEY
  );

  res.send({ token });
});

export { router as routerSignin };
