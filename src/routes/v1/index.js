import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from './boardRoutes';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'APIs v1 are ready to use' });
});

Router.use('/boards', boardRoutes);

export const APIs_V1 = Router;
