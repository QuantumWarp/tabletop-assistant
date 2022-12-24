import { NextFunction, Request, Response } from 'express';

export class ResourceNotFound extends Error {}

const statusCode = (err: Error): number => {
  switch (err.constructor) {
    case ResourceNotFound: return 404;
    default: return 500;
  }
};

const friendlyMessage = (err: Error): string => {
  switch (err.constructor) {
    case ResourceNotFound: return 'Resource not found';
    default: return 'Internal server error';
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (err: Error, req: Request, res: Response, _next: NextFunction) => {
  // console.log(err.stack);
  res.status(statusCode(err)).send(friendlyMessage(err));
};
