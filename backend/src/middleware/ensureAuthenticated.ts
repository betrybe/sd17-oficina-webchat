import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { UserService } from '../services/userService';

async function getUser(token: string) {
  const userService = new UserService();
  const secret = process.env.JWT_SECRET as string;
  const { sub } = verify(token, secret);
  const data = JSON.parse(sub as string);

  const user = await userService.findById(data.userId);

  if (!user) {
    throw new AppError('Token must be a valid token', 401);
  }

  return data;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError('Token not found', 401);
  }

  try {
    const data = await getUser(token);

    request.userId = data.userId;

    next();
  } catch (error) {
    throw new AppError('Token must be a valid token', 401);
  }
}
