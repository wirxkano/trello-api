import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().max(50).trim().strict()
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

export const cardValidation = {
  createNew
};
