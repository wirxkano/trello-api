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

Router.route('/:id')
  .get(boardController.getDetails) // some data is not important to validate, so can access controller directly
  .put(boardValidation.update, boardController.update); // update

Router.route('/supports/moving_card')
  .put(boardValidation.moveCardToDifferentColumnsAPI, boardController.moveCardToDifferentColumnsAPI);

export const boardRoutes = Router;
