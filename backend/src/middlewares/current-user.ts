import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { JWT_KEY } from '../env';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Estoy en current user');
  if (!req.headers.authorization) {
    return next();
  }

  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const JwtPayload = Jwt.verify(token, JWT_KEY) as UserPayload;
    req.currentUser = JwtPayload;
  } catch (error) {}

  next();
};
