import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);

    res.status(StatusCodes.CREATED).json({ msg: 'POST from controller: API create new board' });
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
