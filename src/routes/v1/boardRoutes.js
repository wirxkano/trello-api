import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'GET: API get list boards' });
  })
  // boardValidation.createNew sucess, it will next to boardController.createNew by next()
  .post(boardValidation.createNew, boardController.createNew);

export const boardRoutes = Router;
