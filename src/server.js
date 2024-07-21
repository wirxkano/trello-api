/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { corsOptions } from '~/config/cors';
import exitHook from 'async-exit-hook';
import { CONNECT_DB, DISCONNECT_DB } from '~/config/mongodb';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddlewares';

const START_SERVER = () => {
  const app = express();

  app.use(cors(corsOptions));

  // enable rq.body json data
  app.use(express.json());
  // route
  app.use('/v1', APIs_V1);
  // middlewares error handle
  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === 'production') {
    // production mode, supported by Render.com
    app.listen(process.env.PORT, () => {
      console.log(`Production running at: ${process.env.PORT}`);
    });
  } else {
    app.listen(env.APP_PORT, () => {
      console.log(`Running: http://${env.APP_HOST}:${env.APP_PORT}/v1/status`);
    });
  }


  exitHook(() => {
    DISCONNECT_DB();
    console.log('exiting');
  });
};

CONNECT_DB()
  .then(() => console.log('DB connected!'))
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
