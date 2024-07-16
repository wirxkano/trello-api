import 'dotenv/config';

export const env = {
  AUTHOR: process.env.AUTHOR,
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT
};