import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';

const treatErrors: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
};

export default treatErrors;
