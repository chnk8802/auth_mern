import Joi from "joi";
import { joiObjectId } from "../custom/custom.validators.js";
import { PAYMENT_METHODS } from "../../constants/enums.js";
import { createPaymentEntryValidation, updatePaymentEntryValidation } from "./paymentEntry/paymentEntry.validation.js";

export const createPaymentValidation = Joi.object({
  customer: joiObjectId().required(),
  entries: Joi.array()
    .items(createPaymentEntryValidation)
    .optional()
    .messages({
      "array.base": "'entries' must be an array of entry objects",
      "array.min": "'entries' cannot be empty",
      "any.required": "'entries' is required",
    }),

  paymentMethod: Joi.array()
    .items(Joi.string().valid(...PAYMENT_METHODS))
    .default("Cash")
    .optional(),
});

export const updatePaymentValidation = Joi.object({
  customer: joiObjectId().optional(),
  entries: Joi.array()
    .items(joiObjectId())
    .messages({
      "array.base": "'entries' must be an array of valid ObjectIds",
    })
    .optional(),
  paymentMethod: Joi.array()
    .items(Joi.string().valid(...PAYMENT_METHODS))
    .optional(),
}).min(1);