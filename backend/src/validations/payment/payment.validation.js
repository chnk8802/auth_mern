import Joi from "joi";
import { joiObjectId } from "../custom/custom.validators.js";
import { PAYMENT_METHODS, PAYMENT_TYPE } from "../../constants/enums.js";
import {
  createPaymentEntryValidation,
  updatePaymentEntryValidation,
} from "./paymentEntry/paymentEntry.validation.js";

export const createPaymentValidation = Joi.object({
  paymentType: Joi.string()
    .valid(...PAYMENT_METHODS)
    .default("Receivable")
    .required(),
  customer: Joi.when("paymentType", {
    is: "Receivable",
    then: joiObjectId().required(),
    otherwise: Joi.forbidden(),
  }),
  supplier: Joi.when("paymentType", {
    is: "Payable",
    then: joiObjectId().required(),
    otherwise: Joi.forbidden(),
  }),
  paymentEntries: Joi.array()
    .items(createPaymentEntryValidation)
    .optional()
    .messages({
      "array.base": "'paymentEntries' must be an array of entry objects",
      "array.min": "'paymentEntries' cannot be empty",
      "any.required": "'paymentEntries' is required",
    }),
  totalAmount: Joi.number().required().min(0).messages({
    "any.required": "Total Amount is required",
    "number.base": "Total Amount must be a number",
  }),
  paymentMethod: Joi.string()
    .valid(...PAYMENT_METHODS)
    .default("Cash")
    .optional(),
});

export const updatePaymentValidation = Joi.object({
  paymentType: Joi.string()
    .valid(...PAYMENT_METHODS)
    .default("Receivable")
    .optional(),
  customer: Joi.when("paymentType", {
    is: "Receivable",
    then: joiObjectId().required(),
    otherwise: Joi.forbidden(),
  }),
  supplier: Joi.when("paymentType", {
    is: "Payable",
    then: joiObjectId().required(),
    otherwise: Joi.forbidden(),
  }),
  paymentEntries: Joi.array()
    .items(joiObjectId())
    .messages({
      "array.base": "'entries' must be an array of valid ObjectIds",
    })
    .optional(),
  paymentMethod: Joi.array()
    .items(Joi.string().valid(...PAYMENT_METHODS))
    .optional(),
}).min(1);
