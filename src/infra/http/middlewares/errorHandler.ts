import AppError from '@/main/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { isCelebrateError } from 'celebrate';

export const errorHandler = (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (isCelebrateError(err)) {
    const values = err.details.values();
    let { message } = values.next().value.details[0];
    message = message.replace('"', '').replace('"', '');

    return res.status(400).json({
      status: 'error',
      message: message || 'no message',
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
