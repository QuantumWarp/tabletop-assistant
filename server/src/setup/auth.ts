import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

import config from './config';
import UserRepository from '../user/user.repository';

// https://developers.google.com/identity/protocols/oauth2/openid-connect
// https://developers.google.com/identity/sign-in/web/backend-auth

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const client = new OAuth2Client(config.googleClientId);

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

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.googleClientId,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    res.sendStatus(401);
    return;
  }

  const repository = new UserRepository();
  const user = await repository.getAndUpsert({
    sub: payload.sub,
    iss: payload.iss,
    email: payload.email,
    name: payload.name,
  });
  req.session.userId = user._id;

  next();
};
