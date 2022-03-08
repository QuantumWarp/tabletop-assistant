import { NextFunction, Request, Response } from 'express';
import jwksClient from 'jwks-rsa';
import jwt, { JwtPayload } from 'jsonwebtoken';

import UserRepository from '../user/user.repository';
import config from './config';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const client = jwksClient({ jwksUri: config.microsoftJwksUri });

const verifyToken = (token: string) => new Promise<JwtPayload | void>(
  (resolve) => {
    jwt.verify(
      token,
      async (header, callback) => {
        try {
          const signingKey = await client.getSigningKey(header.kid);
          const publicKey = signingKey.getPublicKey();
          callback(undefined, publicKey);
        } catch (err) {
          callback(err, undefined);
        }
      },
      (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') resolve();
        else resolve(decoded);
      },
    );
  },
);

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next();
    return;
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    res.sendStatus(401);
    return;
  }

  const decoded = await verifyToken(token);

  if (!decoded) {
    res.sendStatus(401);
    return;
  }

  if (!decoded.sub || !decoded.iss) {
    res.sendStatus(401);
    return;
  }

  const repository = new UserRepository();
  const user = await repository.getAndUpsert({
    sub: decoded.sub,
    iss: decoded.iss,
    email: decoded.email,
    name: decoded.name,
  });
  req.session.userId = user._id;

  next();
};
