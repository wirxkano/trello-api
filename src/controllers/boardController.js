import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);

    const createdBoard = await boardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (err) {
    next(err);
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: err.message
    // });
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.getDetails(boardId);

    res.status(StatusCodes.OK).json(board);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const updatedBoard = await boardService.update(boardId, req.body);

    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (err) { next(err); }
};

const moveCardToDifferentColumnsAPI = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumnsAPI(req.body);

    res.status(StatusCodes.OK).json(result);
  } catch (err) { next(err); }
};

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumnsAPI
};
