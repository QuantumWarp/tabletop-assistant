import 'dotenv/config';

export default {
  dbConnection: process.env.DB_CONNECTION ?? '',
  microsoftJwksUri: process.env.MICROSOFT_JWKS_URI ?? '',
  sessionSecret: process.env.SESSION_SECRET ?? '',
};
