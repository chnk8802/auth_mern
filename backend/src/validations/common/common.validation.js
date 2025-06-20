import Joi from "joi";
import { joiObjectId } from "../custom/custom.validators.js";

/**
 * Validates a single route param ID (e.g. req.params).
 * Useful for GET, PUT, DELETE routes like /resource/:id
 */
export const paramIdValidation = Joi.object({
    id: joiObjectId().required().messages({
      "any.required": `id is required`,
      "string.pattern.name": `Invalid id`,
    }),
  });

/**
 * Validates an array of MongoDB ObjectIds in the body.
 * Useful for bulk operations like delete or duplicate.
 */
export const multipleIdsValidation = Joi.object({
  ids: Joi.array()
    .items(
      joiObjectId().messages({
        "string.pattern.name": "Invalid ID in list",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "'ids' must be an array",
      "array.min": "At least one ID is required",
      "any.required": "'ids' array is required",
    }),
});

/**
 * Validates an object containing an array of MongoDB ObjectIds and a field property in the body.
 * Useful for bulk update operations for a single field of a record.
 */

