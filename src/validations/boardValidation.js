import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { BOARD_TYPES } from '~/utils/constants';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(1).max(50).trim().strict(),
    description: Joi.string().required().max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  });

  try {
    // some property of request: req.query, req.params, req.files, req.cookies, req.jwtDecoded
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // after validate data next to controller
    next();
  }
  catch (err) {
    const errorMessage = new Error(err).message;
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    next(customError);
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(err).message
    // });
  }

};

export const boardValidation = {
  createNew
};
