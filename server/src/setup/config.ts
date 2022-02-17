import 'dotenv/config';

export default {
  dbConnection: process.env.DB_CONNECTION ?? '',
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
  sessionSecret: process.env.SESSION_SECRET ?? '',
};
