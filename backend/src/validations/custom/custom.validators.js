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
/**
 * Joi custom validator for wrapping input data in data array
 */
export const inputDataWrapper = (itemSchema) => {
  return Joi.object({
    data: Joi.array()
      .items(itemSchema)
      .min(1)
      .required()
      .messages({
        "any.required": `"data" is required`,
        "array.base": `"data" must be an array`,
        "array.min": `"data" must contain at least one item`,
      }),
  });
};