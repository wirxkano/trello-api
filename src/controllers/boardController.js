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

export const boardController = {
  createNew
};
