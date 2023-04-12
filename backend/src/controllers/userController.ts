import { Request, Response } from 'express';
import { User } from '../models';
import JsonWebToken from 'jsonwebtoken';
import { JWT_KEY } from '../env';
import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '../errors';
import { DuplicateUserError } from '../errors/duplicate-user-error';

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExist = await User.find({ email });
  if (userExist.length > 0) {
    throw new DuplicateUserError();
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
    throw new InvalidCredentialsError();
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new InvalidCredentialsError();
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
