/* eslint-disable no-console */
import express from 'express';
import exitHook from 'async-exit-hook';
import { CONNECT_DB, DISCONNECT_DB } from '~/config/mongodb';
import { env } from '~/config/enviroment';

const START_SERVER = () => {
  const app = express();

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  app.listen(env.APP_PORT, () => {
    console.log(`Running: http://${env.APP_HOST}:${env.APP_PORT}`);
  });

  exitHook(() => {
    DISCONNECT_DB();
    console.log('exiting');
  });
};

CONNECT_DB()
  .then(() => console.log('DB connected!', env.AUTHOR))
  .then(() => START_SERVER())
  .catch(err => {
    console.error(err);
    process.exit(0);
  });

// IIFE
// (async () => {
//   try {
//     await CONNECT_DB();
//     START_SERVER();
//   }
//   catch (err) {
//     console.error(err);
//     process.exit(0);
//   }
// })();