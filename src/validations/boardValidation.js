import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { BOARD_TYPES } from '~/utils/constants';
import ApiError from '~/utils/ApiError';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

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

const update = async (req, res, next) => {
  // not require field in update
  const correctCondition = Joi.object({
    title: Joi.string().min(1).max(50).trim().strict(),
    description: Joi.string().max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
    next();
  }
  catch (err) {
    const errorMessage = new Error(err).message;
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    next(customError);
  }

};

const moveCardToDifferentColumnsAPI = async (req, res, next) => {
  const correctCondition = Joi.object({
    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),

    nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (err) {
    const errorMessage = new Error(err).message;
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    next(customError);
  }

};


export const boardValidation = {
  createNew,
  update,
  moveCardToDifferentColumnsAPI
};
