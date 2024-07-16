import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(1).max(50).trim().strict(),
    description: Joi.string().required().max(256).trim().strict()
  });

  try {
    console.log(req.body);

    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // next();
    res.status(StatusCodes.CREATED).json({ msg: 'POST from validation: API create new board' });
  }
  catch (err) {
    console.log(err);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(err).message
    });
  }

};

export const boardValidation = {
  createNew
};