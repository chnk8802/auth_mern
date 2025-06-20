import mongoose from "mongoose";
import Joi from "joi";

/**
 * Joi custom validator for MongoDB ObjectId
 */
export const joiObjectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "ObjectId Validation");