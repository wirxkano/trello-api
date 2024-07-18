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

export const boardController = {
  createNew,
  getDetails
};
