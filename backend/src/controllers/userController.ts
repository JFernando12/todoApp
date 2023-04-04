import { Request, Response } from 'express';
import { User } from '../models';
import JsonWebToken from 'jsonwebtoken';
import { JWT_KEY } from '../env';
import bcrypt from 'bcrypt';

const signup = async (req: Request, res: Response) => {
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
};

const signin = async (req: Request, res: Response) => {
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
};

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.send(users);
};

export default { signup, signin, getUsers };
